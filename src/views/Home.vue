<template>
  <div>
    <v-container class="mt-12 mb-12">
      <v-row>
        <v-col cols="12">
          <agency-card
            path="/files/adult-redeploy"
            title="Adult Redeploy Illinois"
            :content="ariContent"
            :buttons="ariButtons"
          />
          <agency-card
            path="/files/icjia"
            title="Illinois Criminal Justice Information Authority"
            logo="icjia-logo-125.png"
            :width="125"
            :height="75"
            :content="icjiaContent"
            :buttons="icjiaButtons"
          />
          <agency-card
            path="/files/spac"
            title="Illinois Sentencing Policy and Advisory Council"
            logo="spac-default.png"
            :width="66"
            :height="100"
            :content="spacContent"
            :buttons="spacButtons"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import AgencyCard from '@/components/AgencyCard'

  export default {
    components: {
      AgencyCard,
    },
    data () {
      return {
        ariContent: 'Adult Redeploy Illinois was established by the Crime Reduction Act (Public Act 96-0761) to provide financial incentives to local jurisdictions for programs that allow diversion of non-violent offenders from state prisons by providing community-based services. Grants are provided to counties, groups of counties, and judicial circuits to increase programming in their areas, in exchange for reducing the number of people they send to the Illinois Department of Corrections. ',
        icjiaContent: 'Lorem markdownum Minervae habebat? Haut ferax murum deos Medusae sepulcro, raptam repulsa instabilemque Maeoniam nec, a tympana, suo pande',
        spacContent: 'Lorem markdownum Minervae habebat? Haut ferax murum deos Medusae sepulcro, raptam repulsa instabilemque Maeoniam nec, a tympana, suo pande',
        ariButtons: [

          { url: '/files/adult-redeploy', icon: 'arrow_right', text: 'Browse Archive', routing: 'remote' },
          { url: 'http://www.icjia.state.il.us/redeploy', icon: 'open_in_new', text: 'Visit Website', routing: 'remote' },

        ],
        icjiaButtons: [

          { url: '/files/icjia', icon: 'arrow_right', text: 'Browse Archive', routing: 'remote' },
          { url: 'http://www.icjia.state.il.us', icon: 'open_in_new', text: 'Visit Website', routing: 'remote' },
        ],
        spacButtons: [

          { url: '/files/spac', icon: 'arrow_right', text: 'Browse Archive', routing: 'remote' },
          { url: 'http://www.icjia.state.il.us/spac', icon: 'open_in_new', text: 'Visit Website', routing: 'remote' },
        ],
      }
    },
  }
</script>
