<script>
import {mapState} from 'vuex';
import {ddApi} from '../../api/dingding';
import BasePage from './BasePage';

export default {
  name: 'EditPage',
  extends: BasePage,
  data() {
    return {
      initData: [],
      form: []
    };
  },
  computed: {
    ...mapState({
      menu: state => state.menu
    })
  },
  methods: {
    isEdit() {
      return JSON.stringify(this.initData) !== JSON.stringify(this.form);
    },
    canGoBack(route) {
      let edit = this.isEdit();
      if (edit) {
        ddApi.editConfirm({
          onSuccess: ({buttonIndex}) => {
            if (buttonIndex === 1) {
              route.go(-1);
            }
          }
        });
      }
      return !edit;
    }
  }
};
</script>
