<template>
  <v-container fluid>
    <v-card>
      user
      {{ users.id_card }}
    </v-card>
  </v-container>
</template>

<script>
export default { 
  data() {
    return {
      ApiKey: 'HRvec2021',
      users: [],
    }
  },

  async mounted() {
    let user = JSON.parse(sessionStorage.getItem('user')) || 0
    let result = await this.$http
      .post('personnel_temporary.php', {
        ApiKey: this.ApiKey,
        id_card: user.id_card,
      })
      .finally(() => (this.loading = false))
    this.users = result.data
    /*     console.log(result.data) */

    if (
      user.user_status == 'tech' ||
      user.user_status == 'se_director' ||
      user.user_status == 'director'
    ) {
    } else {
      this.$router.push('/')
    }
  },

  methods: {
    home() {
      this.$router.push('user')
    },
    logout() {
      sessionStorage.clear()
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped></style>
