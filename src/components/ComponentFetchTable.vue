<template>
  <div>
    <table>
      <tr>
        <th>Album</th>
        <th>Artist</th>
        <th>Date Published</th>
      </tr>
      <tr v-for="(entry, index) in storedjson" v-bind:key="index">
        <td>{{storedjson[index].name}}</td>
        <td>{{storedjson[index].artist}}</td>
        <td>{{storedjson[index].datepublished}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
/* eslint-disable indent, semi, eol-last */

export default {
  name: 'ComponentFetchTable',
  props: {
    url: String
  },
  data () {
    return {
      storedjson: [{}]

    }
  },
  watch: {
    url: function () {
      this.fetchJson()
    }
  },
  created: function () {
    this.fetchJson()
  },
  methods: {
    fetchJson: function () {
      fetch(this.url)
        .then((response) => {
          response.json().then((response) => {
              this.storedjson = response;
          })
        })
        .then((response) => {
        });
      }
  }
}
</script>