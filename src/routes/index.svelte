<script>
    import YouTube from 'svelte-youtube'

    // https://developers.google.com/youtube/player_parameters
    const options = {
        playerVars: {
            autoplay: 1,
            mute: 1,
            enablejsapi: 1,
            controls: 0
        }
    }
</script>

<YouTube
    id='yt-iframe'
    videoId='5qap5aO4i9A'
    options={options}
/>

<style>
    :global(#yt-iframe){
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        pointer-events: 0;
        user-select: none;
    }
</style>