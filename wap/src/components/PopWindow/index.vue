<template>
  <div>
    <ChoosePop v-if="DEV"/>
    <ChooseMobilePop v-if="DEV"/>
    <choose-inner-color />
    <choose-out-color/>
    <MenuPop/>
    <ImageViewerPop/>
    <LoadingPop/>
    <yi-input-pop/>
    <DialogPop/>
    <DialogInfo/>
    <ChooseCustomize />
    <SelectPop/>
    <RoutePop v-if="DEV"/>
    <ChooseCustomize />
    <TestUtilPop v-if="$store.state.user.isTester" />
  </div>
</template>

<script>
import {RUN_IN_DD} from '../../config';
// import ChoosePop from './ChoosePop';
// import ChooseInnerColor from './ChooseInnerColor';
// import ChooseOutColor from './ChooseOutColor';
// import MenuPop from './MenuPop';
// import ImageViewerPop from './ImageViewerPop';
// import ChooseMobilePop from './ChooseMobilePop';
// import LoadingPop from './LoadingPop';
// import RoutePop from './RoutePop';
// import DialogPop from './DialogPop';
// import SelectPop from './SelectPop';
// import TestUtilPop from './TestUtilPop';

export default {
  name: 'globalWindow',
  components: {
    ChoosePop: ()=>import('./ChoosePop'),
    ChooseInnerColor: ()=>import('./ChooseInnerColor'),
    ChooseOutColor: ()=>import('./ChooseOutColor'),
    MenuPop: ()=>import('./MenuPop'),
    ImageViewerPop: ()=>import('./ImageViewerPop'),
    ChooseMobilePop: ()=>import('./ChooseMobilePop'),
    LoadingPop: ()=>import('./LoadingPop'),
    RoutePop: ()=>import('./RoutePop'),
    DialogPop: ()=>import('./DialogPop'),
    DialogInfo: ()=>import('./DialogInfo'),
    ChooseCustomize: ()=>import('./ChooseCustomize'),
    SelectPop: ()=>import('./SelectPop'),
    TestUtilPop: ()=>import('./TestUtilPop')
  },
  data() {
    return {
      DEV: !RUN_IN_DD
    };
  }
};
</script>
