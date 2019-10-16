<template>
  <q-page class="row justify-center">
    <q-card class="q-my-lg q-pt-md flat bordered" style="width: 75%">
      <q-card-section>
        <q-markdown :src="template" />
        <component-api title="QDatetable API" :json="json" />
        <q-markdown>This page was created with [QMarkdown](https://quasarframework.github.io/app-extension-qmarkdown).</q-markdown>
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="primary" />
        </q-page-scroller>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
import template from "../markdown/qdatetable.md";
import json from "../../../src/component/QDateTable.json";

export default {
  name: "PageIndex",

  data() {
    return {
      template: template,
      json: json
    };
  }
};
</script>
