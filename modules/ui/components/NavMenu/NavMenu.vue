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
            $router.push(
              localePath({ name: 'test-users', params: { test: 'test' } })
            );
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
import { defineComponent, ref, onMounted } from '@vue/composition-api';

export default defineComponent({
  setup() {    
    onMounted (() => {
      console.log('======>test<===========');
    })
  },
  data() {
    return {
      key: ["1"],
    };
  },
  created() {
    const locale: String = this.$i18n.locale;
    if (new RegExp(locale + "/schemas", "ig").test(this.$route.path)) {
      this.key = ["2"];
    } else if (new RegExp(locale + "/product", "ig").test(this.$route.path)) {
      this.key = ["3"];
    } else if (
      new RegExp(locale + "/collectionType", "ig").test(this.$route.path)
    ) {
      this.key = ["4"];
    } else if (new RegExp(locale + "/test", "ig").test(this.$route.path)) {
      this.key = ["5"];
    } else {
      this.key = ["1"];
    }
  }
});
</script>
