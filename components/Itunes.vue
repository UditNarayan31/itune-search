<template>
    <div>
        <v-card class="pa-5">
            <h2 class="text-center">Itunes Search</h2>
            <form @submit.prevent="ituneSubmit()">
                <v-text-field 
                dense
                :label="label"
                v-model="itunes"
                data-itune
                outlined
                ></v-text-field>
                <!-- <v-radio-group row v-model="entity" data-radio>
                <v-radio label="Album" value="album"></v-radio>
                <v-radio label="Music Track" value="musicTrack"></v-radio>
                </v-radio-group> -->
                <v-btn type="submit" small text>Search</v-btn>
                <v-alert class="success" v-if="show">{{itunes}}</v-alert>
            </form>
            <v-card flat class="mt-5">
                 <v-card-text v-if="albums.length">
                 <v-layout row>
                 <v-flex xs12 class="text-xs-center">
                 <v-btn fab outline color="white" class="decreses" small @click="ituneSubmit()">
                 <v-icon>mdi-chevron-left</v-icon>
                 </v-btn>
                 <span class="title white--text mx-4">{{ page }}</span>
                 <v-btn fab outline color="white" class="increse" small @click="ituneSubmit(true)">
                 <v-icon>mdi-chevron-right</v-icon>
                 </v-btn>
                 </v-flex>
                 </v-layout>
                   <v-row>
                    <v-col cols="12" sm="4" v-for="(album,i) in albums" :key="i">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-avatar 
                                size="135"
                                @click="toiTunesAlbum(album)"
                                >
                                <img :src="resizeArtworkUrl(album)" alt="Album Cover" class="album-cover">
                                </v-avatar>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div v-if="album.wrapperType === 'track'" class="subheading font-weight-medium white--text">{{ album.trackName }}</div>
                                <div class="subheading">{{ album.collectionName }}</div>
                                <div class="grey--text">{{ album.artistName}}</div>
                                <div class="grey--text">{{ getReleaseYear(album) }}</div>
                                <div class="grey--text">{{ album.primaryGenreName}}</div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row> 
                </v-card-text>
            </v-card>
        </v-card>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data: () => ({
        label:'Search Itunes',
        itunes:'',
        entity:'album',
        show:false,
        page:0,
        albums:[],
        message:'today date is' + new Date().toLocaleString()
    }),

    watch: {
      itunes: function (val) {
        if (!val) {
          this.albums = [],
          this.page = 0
        }
      },

      entity: function () {
          this.itunes = ''
          this.label = this.entity === 'album' ? 'Search Itunes' : 'Enter Music Track'
      },
    },
    
    methods:{
        ituneSubmit(increase){
           this.show = true
        
        setTimeout(() => {
            this.show = false   
        }, 1000);
          
         if (!this.itunes) {
          return
        }

        return axios.get(`https://itunes.apple.com/search?term=${this.itunes}&entity=${this.entity}&limit=200&offset=${this.page * 200}`)
          .then((response) => {
            if (increase) {
              this.page++
            } else {
              this.page--
            }
            this.albums = response.data.results
          })
      },

        resizeArtworkUrl (album) {
           return album.artworkUrl100.replace("100x100", "160x160")
        }, 

        getReleaseYear (album) {
           return album.releaseDate.substr(0, 4)
        },

        toiTunesAlbum (album) {
        window.open(album.collectionViewUrl, '_blank')
      }
    }
}
</script>