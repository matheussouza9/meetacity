<script lang="ts">
	import { fade } from 'svelte/transition'
	import YouTube, { PlayerStates, YoutubePlayerOptions } from '$lib/components/Youtube.svelte'

	let videoId = 'fG_idt30MZA'
	let playerState = null
	let volume = 0

	let options: YoutubePlayerOptions = {
		videoId,
		width: '100%',
		height: '100%',
		playerVars: {
			autoplay: 1,
			enablejsapi: 1,
			controls: 0,
			rel: 0,
			fs: 0,
			iv_load_policy: 3,
			disablekb: 1,
			playsinline: 1,
			modestbranding: 1,
		}
	}

	$: isPlaying = playerState === PlayerStates.PLAYING

	function onStateChange(event: CustomEvent) {
		playerState = event.detail
	}
</script>

{#if !isPlaying}
	<!-- <div in:fade out:fade={{ duration: 500, delay: 2800 }} class="cortina" /> -->
	<div transition:fade class="cortina" />
{/if}

<div class="iframe-wrapper">
	<YouTube id="yt-iframe" {videoId} {volume} {options} on:stateChange={onStateChange} />
</div>

<style>
	.iframe-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: -2;
		pointer-events: none;
		user-select: none;
	}
	:global(#yt-iframe) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.cortina {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: grey;
		z-index: -1;
	}

	@media (min-aspect-ratio: 16 / 9) {
		.iframe-wrapper {
			height: 300%;
			top: -100%;
		}
	}

	@media (max-aspect-ratio: 16 / 9) {
		.iframe-wrapper {
			width: 300%;
			left: -100%;
		}
	}

	@media all and (display-mode: fullscreen) {
		.iframe-wrapper {
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
		}
	}
</style>
