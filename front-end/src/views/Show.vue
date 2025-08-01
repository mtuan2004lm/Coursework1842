<template>
  <div>
    <h1>Show Word</h1>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="united kingdom flag"></i> English
      </div>
      <input id="1" type="text" readonly :value="word.english" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="germany flag"></i> German
      </div>
      <input id="2" type="text" readonly :value="word.german" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="vietnam flag"></i> Vietnamese
      </div>
      <input id="3" type="text" readonly :value="word.vietnamese" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="france flag"></i> France
      </div>
      <input id="4" type="text" readonly :value="word.france" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="spain flag"></i> Spain
      </div>
      <input id="5" type="text" readonly :value="word.spain" />
    </div>

    <div class="actions">
      <router-link :to="{ name: 'edit', params: { id: $route.params.id } }">
        Edit word
      </router-link>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'show',
  data() {
    return {
      word: {
        english: '',
        german: '',
        vietnamese: '',
        france: '',
        spain: ''
      }
    };
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.id);
  }
};
</script>

<style scoped>
.actions a {
  display: block;
  text-decoration: underline;
  margin: 20px 10px;
}
</style>
