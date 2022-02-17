 <template>
  <a-menu theme="dark" mode="inline" :default-selected-keys="key">
    <a-menu-item
      key="1"
      @click="
        () => {
          if ($route.path !== '/') {
            $router.push(localePath('/'));
          }
        }
      "
    >
      <a-icon type="home" />
      <span>Dashboard</span>
    </a-menu-item>
    <a-menu-item
      key="2"
      @click="
        () => {
          if ($route.path !== '/schemas') {
            $router.push(localePath('/schemas'));
          }
        }
      "
    >
      <a-icon type="folder-open" />
      <span>Schema Manager</span>
    </a-menu-item>
    <a-menu-item
      key="3"
      @click="
        () => {
          if ($route.path !== '/product') {
            $router.push(localePath('/product'));
          }
        }
      "
    >
      <a-icon type="folder-open" />
      <span>Products</span>
    </a-menu-item>
    <a-menu-item
      key="4"
      @click="
        () => {
          if ($route.path !== '/collectionType') {
            $router.push(localePath('/collectionType'));
          }
        }
      "
    >
      <a-icon type="folder-open" />
      <span>Collection types</span>
    </a-menu-item>
    <a-menu-item
      key="5"
      @click="
        () => {
          if ($route.path !== '/users') {
            $router.push(localePath({ name: 'test-users', params: { test: 'test' } }));
          }
        }
      "
    >
      <a-icon type="user" />
      <span>Users</span>
    </a-menu-item>
  </a-menu>
</template> 

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const key: any = ref<string[]>(['1']);
    const instance: any = getCurrentInstance();
    const locale: String = instance.proxy.$i18n.locale;

    if (new RegExp(locale + '/schemas', 'ig').test(instance.proxy.$route.path)) {
      key.value = ['2'];
    } else if (new RegExp(locale + '/product', 'ig').test(instance.proxy.$route.path)) {
      key.value = ['3'];
    } else if (new RegExp(locale + '/collectionType', 'ig').test(instance.proxy.$route.path)) {
      key.value = ['4'];
    } else if (new RegExp(locale + '/test', 'ig').test(instance.proxy.$route.path)) {
      key.value = ['5'];
    } else {
      key.value = ['1'];
    }

    return {
      key,
    };
  },
});
</script>
