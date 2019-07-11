<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState({
      userAuths: state => state.user.userAuths,
      location: state => state.user.location
    }),
    isLeader() {
      return this.$store.getters['user/isLeader'];
    }
  }
};
</script>
