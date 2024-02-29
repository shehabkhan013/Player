import { reactive } from 'vue'
import axios from 'axios'
import course from './data'

const fn = reactive({
    initialize () {
        console.log('Engine initialized')
        axios.get('https://62dd8310ccdf9f7ec2c91b1b.mockapi.io/api/masterin-alpine-js-demo')
        .then(response => {
            course.chapters = response.data.chapters
            course.intro = response.data.intro
            course.title = response.data.title
            course.id = response.data.id
            this.player.init()
        })
        this.player.currentEpisode = course.intro
    },
    player: {
        currentEpisode : {},
        episodes: [],
        init(){
            course.chapters.forEach(c => {
               c.episodes.forEach(e => {
                   this.episodes.push(e)
               })
            })
        },
        play(episode){
            this.currentEpisode = episode
        },
        playNext(){
            let nextIndex = 0
            const currentEpisodeUuid = this.currentEpisode.uuid

            if(currentEpisodeUuid){
                nextIndex = this.episodes.findIndex(e => e.uuid === currentEpisodeUuid) + 1
            }
            if(this.episodes[nextIndex]){
                this.play(this.episodes[nextIndex])
            }
        },
        playPrevious(){
            let previousIndex = 0;
            const currentEpisodeUuid = this.currentEpisode.uuid
            if(currentEpisodeUuid){
                previousIndex = this.episodes.findIndex(e => e.uuid === currentEpisodeUuid) - 1
            }
            if(this.episodes[previousIndex]){
                this.play(this.episodes[previousIndex])
            }

        }
    }
    
});
export default fn