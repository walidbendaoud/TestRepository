 <template>
  <a-menu theme="dark" mode="inline" :default-selected-keys="key">
    <a-menu-item 
      key="1" 
      @click="() => { if ($route.path !== '/') { $router.push({path: '/'}) }}">
        <a-icon type="home" />
        <span>Dashboard</span>
    </a-menu-item>
    <a-menu-item 
      key="2" 
      @click="() => { if ($route.path !== '/product') { $router.push({path: '/product'}) }}">
        <a-icon type="folder-open" />
        <span>Schema</span>
    </a-menu-item>
    <a-menu-item 
      key="3" 
      @click="() => { if ($route.path !== '/users') { $router.push({path: '/users'})}}">
        <a-icon type="user" />
        <span>Users</span>
    </a-menu-item>				
  </a-menu>
</template> 

<script lang="ts">

import {defineComponent} from '@vue/composition-api' 

export default defineComponent({
  setup() {
    //console.log(this.$route.path)
  },
  data(){
    return {
      key: ['1']
    }
  },
  created(){
    if(this.$route.path =='/users' || this.$route.path == '/users/add'){
      this.key = ['3']
    }else if(this.$route.path =='/schemas'){
      this.key= ['2']
    }else{
      this.key = ['1']
    }
  }
})
</script>
