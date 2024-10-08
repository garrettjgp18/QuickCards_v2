async function reteriveTranscript(id) {
    return new Promise((resolve, reject) => {
        // Extract the video ID from the provided URL
        const videoId = new URLSearchParams(id.location.search).get('v');

        // Regular expression to match the initial player response of a YouTube video
        const YT_INITIAL_PLAYER_RESPONSE_RE =
            /ytInitialPlayerResponse\s*=\s*({.+?})\s*;\s*(?:var\s+(?:meta|head)|<\/script|\n)/;

        // Initialize player variable
        let player = id.ytInitialPlayerResponse;

        // Check if player is not defined or video ID doesn't match with the player's video ID
        if (!player || videoId !== player.videoDetails.videoId) {
            // Fetch the YouTube video page with the specified video ID
            fetch('https://www.youtube.com/watch?v=' + videoId, {timeout: 30000})
                .then(function (response) {
                    return response.text(); // Convert response to text
                })
                .then(function (body) {
                    // Extract player response from the fetched HTML body
                    const playerResponse = body.match(YT_INITIAL_PLAYER_RESPONSE_RE);
                    if (!playerResponse) {
                        console.warn('Unable to parse playerResponse');
                        reject('Unable to parse playerResponse');
                        return;
                    }
                    // Parse player response JSON
                    player = JSON.parse(playerResponse[1]);

                    // Extract metadata from the player response
                    const metadata = {
                        title: player.videoDetails.title,
                        duration: player.videoDetails.lengthSeconds,
                        author: player.videoDetails.author,
                        views: player.videoDetails.viewCount,
                    };

                    // Get the tracks and sort them by priority
                    const tracks = player.captions.playerCaptionsTracklistRenderer.captionTracks;
                    tracks.sort(compareTracks);

                    // Fetch the transcript for the first track
                    fetch(tracks[0].baseUrl + '&fmt=json3')
                        .then(function (response) {
                            return response.json(); // Convert response to JSON
                        })
                        .then(function (transcript) {
                            // Process the transcript data
                            const result = { transcript: transcript, metadata: metadata };

                            // Convert transcript events into a readable string
                            const parsedTranscript = transcript.events
                                .filter(function (x) {
                                    return x.segs; // Remove invalid segments
                                })
                                .map(function (x) {
                                    return x.segs
                                        .map(function (y) {
                                            return y.utf8;
                                        })
                                        .join(' '); // Concatenate segments into a string
                                })
                                .join(' ') // Concatenate all segments
                                .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove invalid characters
                                .replace(/\s+/g, ' '); // Replace any whitespace with a single space

                            // Resolve the promise with the extracted transcript
                            resolve(parsedTranscript);
                        })
                        .catch(function (error) {
                            reject(error);
                        });
                })
                .catch(function (error) {
                    reject(error);
                });
        } else {
            // If player already exists and video ID matches, resolve with existing transcript
            resolve('Transcript already available');
        }
    });
}

// Function to compare tracks based on language and kind
function compareTracks(track1, track2) {
    const langCode1 = track1.languageCode;
    const langCode2 = track2.languageCode;

    if (langCode1 === 'en' && langCode2 !== 'en') {
        return -1; // English comes first
    } else if (langCode1 !== 'en' && langCode2 === 'en') {
        return 1; // English comes first
    } else if (track1.kind !== 'asr' && track2.kind === 'asr') {
        return -1; // Non-ASR comes first
    } else if (track1.kind === 'asr' && track2.kind !== 'asr') {
        return 1; // Non-ASR comes first
    }

    return 0; // Preserve order if both have same priority
}

//function that gets the video id from a video and puts it in the format of ?=VideoID
function YouTubeVideoId(url) {
    // Regular expression to match YouTube video ID from URL
    const videoIdRegex = /[?&]v=([^&]+)/;
    // Attempt to match the video ID in the URL
    const match = url.match(videoIdRegex);
    // If a match is found, return the video ID in the required format, otherwise return null
    if (match) {
        return {
            location: {
                search: `?v=${match[1]}`
            }
        };
    } else {
        return null;
    }
}


// *** this is to test - you can comment this out.
// make sure you call the method just like this withi the server.js endpoint
// ensure you pass in the formatted video ID and not the entire URL.

//var youtubeUrl = "https://www.youtube.com/watch?v=IYbkZgR77rs";
//var videoId = YouTubeVideoId(youtubeUrl);
//reteriveTranscript(videoId);

// Export the reteriveTranscript function for use in other modules
module.exports = { reteriveTranscript ,YouTubeVideoId };

