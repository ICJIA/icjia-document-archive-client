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
            path="/files/ifvcc"
            title="Illinois Family Violence Coordinating Councils"
            logo="ifvcc-logo-purple.png"
            :width="125"
            :height="125"
            :content="ifvccContent"
            :buttons="ifvccButtons"
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
        ariContent: '<p>Adult Redeploy Illinois was established by the Crime Reduction Act (Public Act 96-0761) to provide financial incentives to local jurisdictions for programs that allow diversion of non-violent offenders from state prisons by providing community-based services. Grants are provided to counties, groups of counties, and judicial circuits to increase programming in their areas, in exchange for reducing the number of people they send to the Illinois Department of Corrections. </p>',
        icjiaContent: '<p>Created in 1983, the Illinois Criminal Justice Information Authority is a state agency dedicated to improving the administration of criminal justice. The Authority brings together key leaders from the justice system and the public to identify critical issues facing the criminal justice system in Illinois, and to propose and evaluate policies, programs, and legislation that address those issues. The agency also works to ensure the criminal justice system in Illinois is efficient and effective. </p><p>The Authority’s specific powers and duties are detailed in the Illinois Criminal Justice Information Act (20 ILCS 3930 et. seq.) The statutory responsibilities of the Authority fall under the categories of grants administration, research and analysis, policy and planning, and information systems and technology. </p>',
        ifvccContent: '<p>Family Violence Coordinating Councils, at both the state and local/circuit levels, provide a forum to improve the institutional, professional and community response to family violence including child abuse, domestic abuse, and elder abuse. Councils provide professional education and prevention; coordinate interventions and services for victims and perpetrators; and contribute to both the improvement of the legal system and the administration of justice.</p><p>Initiated under the auspices of the Illinois Supreme Court in 1990, Illinois is one of the few states that has a systematically organized, statewide infrastructure that operates at both the state and local levels. Since the 1970’s, a comprehensive, coordinated approach to preventing family violence has been promoted as the most efficient and effective way to penetrate systems and mobilize them for the greatest change.</p>',
        spacContent: '<p>SPAC was created to collect, analyze and present data from all relevant sources to more accurately determine the consequences of sentencing policy decisions and to review the effectiveness and efficiency of current sentencing policies and practices.</p><p>The purpose of SPAC is to review sentencing policies and practices and examine how those policies and practices impact the criminal justice system as a whole in the State of Illinois.</p>',
        ariButtons: [

          { url: `${this.$store.getters.config.archiveURL}/files/adult-redeploy`, icon: 'arrow_right', text: 'Browse ARI Archive', routing: 'remote' },
          { url: 'http://www.icjia.state.il.us/redeploy', icon: 'open_in_new', text: 'Visit Website', routing: 'remote' },

        ],
        icjiaButtons: [

          { url: `${this.$store.getters.config.archiveURL}/files/icjia`, icon: 'arrow_right', text: 'Browse ICJIA Archive', routing: 'remote' },
          { url: 'http://www.icjia.state.il.us', icon: 'open_in_new', text: 'Visit Website', routing: 'remote' },
        ],
        ifvccButtons: [

          { url: `${this.$store.getters.config.archiveURL}/files/ifvcc`, icon: 'arrow_right', text: 'Browse IFVCC Archive', routing: 'remote' },
          { url: 'http://www.icjia.state.il.us/ifvcc', icon: 'open_in_new', text: 'Visit Website', routing: 'remote' },
        ],
        spacButtons: [

          { url: `${this.$store.getters.config.archiveURL}/files/spac`, icon: 'arrow_right', text: 'Browse SPAC Archive', routing: 'remote' },
          { url: 'http://www.icjia.state.il.us/spac', icon: 'open_in_new', text: 'Visit Website', routing: 'remote' },
        ],
      }
    },
  }
</script>
