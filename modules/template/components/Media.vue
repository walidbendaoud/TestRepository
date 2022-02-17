<template>
  <div>
    <div v-if="isMedia" id="components-modal-demo-position">
      <a-modal v-model="visible" centered :footer="null" :width="800" @cancel="useHide()">
        <div class="popupBlock" style="margin-top: 50px">
          <h1>{{ $t('uploadNewMedia') }}</h1>
          <img v-if="!btnSave" :src="imageUrl" alt="media" width="100" height="100">
          <a-form-item>
            <a-upload
              v-if="btnSave"
              name="media"
              list-type="picture-card"
              class="preview-uploader"
              :before-upload="useBeforeUpload"
              :remove="useHandlePreviewDrop"
              @change="useHandlePreviewChange"
            >
              <a-button> <a-icon type="upload" /> {{ $t('upload') }} </a-button>
            </a-upload>
          </a-form-item>
          <div class="d-row">
            <a-button type="primary" icon="download" :disabled="btnSave" @click="useBtnSaveChange">
              {{ $t('save') }}
            </a-button>
            <div v-if="visible2">
              <a-button type="primary" @click="useAddToTextarea(0)">
                {{ $t('addContent') }}
              </a-button>
            </div>
          </div>
        </div>
        <div class="popupBlock">
          <h1>{{ $t('media') }}</h1>
          <div v-if="imageNameArray !== null && imageNameArray.length > 0" class="mediaList">
            <a-list item-layout="horizontal" :data-source="imageNameArray">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <img :src="imageUrlArray[index]" alt="" class="imgPreview">
                <a-list-item-meta>
                  <span slot="title">{{ item }}</span>
                </a-list-item-meta>
                <div class="d-row">
                  <a-icon type="check" @click="useAddToTextarea(index)" />
                  <a-icon type="close" class="closeIcon" @click="useRemoveImageName(index)" />
                </div>
              </a-list-item>
            </a-list>
          </div>
        </div>
      </a-modal>
    </div>

    <a-upload
      v-if="!isMedia"
      trigger="click"
      name="preview"
      list-type="picture-card"
      class="preview-uploader"
      :before-upload="useBeforeUpload"
      :remove="useHandlePreviewDrop"
      @change="useHandlePreviewChange"
    >
      <div>
        <a-icon :type="loadingIcon ? 'loadingIcon' : 'plus'" />
        <div class="ant-upload-text">
          {{ $t('upload') }}
        </div>
      </div>
    </a-upload>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from '@nuxtjs/composition-api'
import { useTemplateStore } from '@TEMPLATE/stores/useStore'

export default defineComponent({
  props: {
    isMedia: {
      type: Boolean,
      default: false
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    imageNameArraySrc: {
      type: Array,
      default: () => []
    },
    imageUrlArraySrc: {
      type: Array,
      default: () => []
    },
    openNotification: {
      type: Function,
      default: () => 1
    }
  },

  setup (props, context) {
    const store: any = useTemplateStore()
    const instance: any = getCurrentInstance()
    const imageNameArray = ref(props.imageNameArraySrc)
    const imageUrlArray = ref(props.imageUrlArraySrc)
    let imageUrl = ref('')
    let loadingIcon = false
    let preview: any
    const btnSave = ref(true)
    let lastFilename = ''
    const body = ref('')
    const visible2 = ref(false)
    const visible = ref(props.isVisible)

    const useBtnSaveChange = () => {
      visible2.value = true
      imageNameArray.value.push(lastFilename)
    }

    const useHide = () => {
      visible.value = false
      context.emit('change-visible', visible.value)
      context.emit('change-imageNameArray', imageNameArray.value, imageUrlArray.value)
    }

    const useAddToTextarea = (val: any = 0) => {
      useHandleBodyChange(val)
      visible2.value = false
      btnSave.value = true
    }

    const useRemoveImageName = (val: any) => {
      imageNameArray.value = imageNameArray.value.slice(val + 1)
      imageUrlArray.value = imageUrlArray.value.slice(val + 1)
    }

    const useHandlePreviewDrop = () => {
      imageUrl = ref('')
    }

    const useGetBase64 = (img: any, callback: any) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    }

    const useHandlePreviewChange = (info: any) => {
      if (info.file.status === 'uploading') {
        loadingIcon = true
        return
      }
      if (info.file.status === 'done') {
        if (visible.value) {
          btnSave.value = false
          lastFilename = info.file.name
        }
        // Get this url from response in real world.
        useGetBase64(info.file.originFileObj, () => {
          loadingIcon = false
        })
      }
    }

    const useBeforeUpload = (file: any) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        alert('You can only upload JPG file!')
      } else {
        const fd = new FormData()
        fd.append('file', file)
        store.useTemplateAddPreview({
          file: fd,
          onError: (e: any) => {
            props.openNotification('error', e)
          },
          onSuccess: (e: any) => {
            preview = { name: file.name, type: file.type, value: e }
            imageUrl.value = instance.proxy.$config.MEDIA + preview.value
            if (visible.value) {
              imageUrlArray.value.push(imageUrl.value)
            }
            if (!visible.value) {
              context.emit('change-preview', preview)
            }
          }
        })
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        alert('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }

    const useHandleBodyChange = (val: any = '') => {
      let imageUrlArrayCh = imageUrlArray.value[val]
      imageUrlArrayCh = '<img src="' + imageUrlArrayCh + '" />\n'
      body.value = body.value + '\n' + imageUrlArrayCh
      context.emit('change-body', body.value)
    }

    return {
      useHide,
      imageUrl,
      body,
      preview,
      useBtnSaveChange,
      imageNameArray,
      imageUrlArray,
      visible2,
      visible,
      useBeforeUpload,
      useHandlePreviewChange,
      useHandlePreviewDrop,
      loadingIcon,
      btnSave,
      lastFilename,
      useAddToTextarea,
      useHandleBodyChange,
      useRemoveImageName
    }
  },
  head () {
    return {
      title: 'Template'
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
.popupBlock {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: $Whisper;
  padding: 50px;
  margin-bottom: 50px;
  .closeIcon {
    text-align: right;
    padding-left: 5px;
    width: 100%;
  }
  .imgPreview {
    width: 50px;
    padding-right: 10px;
  }
  button {
    margin-right: 8px;
  }
  .d-row {
    display: flex;
  }
}
.mediaList {
  width: 100%;
  i {
    cursor: pointer;
  }

  li.ant-list-item {
    background: $white;
    padding: 12px;
  }
}
</style>
