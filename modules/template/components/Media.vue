<template>
  <div>
    <div v-if="isMedia" id="components-modal-demo-position">
      <a-modal v-model="visible" centered :footer="null" :width="800" @cancel="useHide()">
        <div class="popupBlock" style="margin-top: 50px">
          <h1>{{ tw.t('uploadNewMedia') }}</h1>
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
              <a-button> <a-icon type="upload" /> {{ tw.t('upload') }} </a-button>
            </a-upload>
          </a-form-item>
          <div class="d-row">
            <a-button type="primary" icon="download" :disabled="btnSave" @click="useBtnSaveChange">
              {{ tw.t('save') }}
            </a-button>
            <div v-if="visible2">
              <a-button type="primary" @click="useAddToTextarea">
                {{ tw.t('addContent') }}
              </a-button>
            </div>
          </div>
        </div>
        <div class="popupBlock">
          <h1>{{ tw.t('media') }}</h1>
          <div v-if="imageNameArray !== null && imageNameArray.length > 0" class="mediaList">
            <a-list item-layout="horizontal" :data-source="imageNameArray">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta>
                  <span slot="title">{{ item }}</span>
                </a-list-item-meta>
                <div style="display: flex">
                  <a-icon type="check" @click="useAddToTextarea" />
                  <a-icon type="close" style="text-align: right; width: 100%" />
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
          {{ tw.t('upload') }}
        </div>
      </div>
    </a-upload>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from '@nuxtjs/composition-api'
import { useTemplateStore } from '../stores/useStore'

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
    openNotification: {
      type: Function,
      default: () => 1
    }
  },

  setup (props, context) {
    const store: any = useTemplateStore()
    const instance: any = getCurrentInstance()
    const imageNameArray = props.imageNameArraySrc
    let imageUrl = ref('')
    let loadingIcon = false
    let preview: any
    const btnSave = ref(true)
    let lastFilename = ''
    const imageUrlArray: any = ref([])
    const body = ref('')
    const visible2 = ref(false)
    const visible = ref(props.isVisible)
    const tw = instance.proxy.$i18n

    const useBtnSaveChange = () => {
      visible2.value = true
      imageNameArray.push(lastFilename)
    }

    const useHide = () => {
      visible.value = false
      context.emit('change-visible', visible.value)
      context.emit('change-imageNameArray', imageNameArray)
    }

    const useAddToTextarea = () => {
      useHandleBodyChange()
      visible2.value = false
      btnSave.value = true
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
          imageUrl.value = ''
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
            imageUrl.value =
              instance.proxy.$config.API.replace(
                'services/otcdslandingpage/api/templates/countryIsoCode/',
                'medias/all/template/'
              ) + preview.value
            if (!btnSave.value && visible.value) {
              imageUrlArray.value.push(imageUrl.value)
              console.log(imageUrlArray)
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

    const useHandleBodyChange = () => {
      console.log(imageUrlArray)
      let imageUrlArrayCh = imageUrlArray.value[imageUrlArray.value.length - 1]
      imageUrlArrayCh = '<img src="' + imageUrlArrayCh + '" />\n'
      body.value = body.value + '\n' + imageUrlArrayCh
      context.emit('change-body', body.value)
    }

    return {
      tw,
      useHide,
      imageUrl,
      body,
      preview,
      useBtnSaveChange,
      imageNameArray,
      visible2,
      visible,
      useBeforeUpload,
      useHandlePreviewChange,
      useHandlePreviewDrop,
      loadingIcon,
      btnSave,
      lastFilename,
      imageUrlArray,
      useAddToTextarea,
      useHandleBodyChange
    }
  },
  head () {
    return {
      title: 'Template'
    }
  }
})
</script>
<style scoped>
.popupBlock {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #eee;
  padding: 50px;
  margin-bottom: 50px;
}
.mediaList {
  width: 100%;
}
.mediaList i {
  cursor: pointer;
}
.d-row {
  display: flex;
}
li.ant-list-item {
  background: #fff;
  padding: 12px;
}
button {
  margin-right: 8px;
}
</style>
