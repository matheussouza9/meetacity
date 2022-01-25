<script context="module" lang="ts">
	import PlayerStates from 'youtube-player/dist/constants/PlayerStates.js'
	import type { YouTubePlayer, Options as YoutubePlayerOptions } from 'youtube-player/dist/types.js'

	export { PlayerStates, YoutubePlayerOptions }
</script>

<script lang="ts">
	import { onMount, createEventDispatcher, onDestroy } from 'svelte'
	import YoutubePlayer from 'youtube-player'

	const dispatch = createEventDispatcher()

	let classAttr: string = '' // class attr names for iframe element
	export { classAttr as class }
	export let videoId: string
	export let id: string = undefined
	export let options: YoutubePlayerOptions
	export let volume = 0

	let playerElem: HTMLElement // player DOM element reference
	let player: YouTubePlayer // player API instance

	onMount(() => createPlayer())
	onDestroy(() => destroyPlayer())

	$: play(videoId)
	$: if (player) player.setVolume(volume)

	function createPlayer() {
		player = YoutubePlayer(playerElem, options)

		player.on('ready', onPlayerReady)
		player.on('error', (event) => dispatch('error', event))
		player.on('stateChange', (event) => dispatch('stateChange', event.data))
		player.on('playbackRateChange', (event) => dispatch('playbackRateChange', event))
		player.on('playbackQualityChange', (event) => dispatch('playbackQualityChange', event))

		// return () => player.destroy()
	}

	function destroyPlayer() {
		if (player) player.destroy()
		if (playerElem) playerElem = null
	}

	function play(videoId: string) {
		// this is needed because the loadVideoById function always starts playing,
		// even if you have set autoplay to 1 whereas the cueVideoById function
		// never starts autoplaying
		if (player && videoId) {
			if (options?.playerVars?.autoplay === 1) {
				player.loadVideoById(videoId)
			} else {
				player.cueVideoById(videoId)
			}
		}
	}

	function onPlayerReady(event: CustomEvent) {
		dispatch('ready', event)
		play(videoId)
	}
</script>

<player {id} class={classAttr} bind:this={playerElem} />
