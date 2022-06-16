
const URL = "https://accounts.spotify.com"
const client_id = "2fad033589084e07ad1c038c6c33e6f2"
const redirect_uri = "http://localhost:3000/callback"
const DBURL = "http://localhost:3001"
const client_secret = "84170d93239b4429990ebdecebe60921"
const SPOTIFY_API = "https://api.spotify.com/v1"

const randString = function (length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;

}

export async function login() {
    var state = randString(16);
    var scope = 'user-read-private user-read-email';


    window.open(`${URL}/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`, '_self')
}


export async function getAllTechniques() {
    const response = await fetch(`${DBURL}/techniques`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}


export async function getTechniqueById(id) {
    const response = await fetch(`${DBURL}/techniques/${id}`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getAccessToken(code) {
    const response = await fetch(`${URL}/api/token`, {
        method: "POST",
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        }).toString()
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}


export async function searchSong(token, input) {
    const response = await fetch(`${SPOTIFY_API}/search?q=${input}&type=track`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}


export async function getSongBySpotifyId(token, id) {
    const response = await fetch(`${SPOTIFY_API}/tracks/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}


export async function getSongFeaturesBySpotifyId(token, id) {
    const response = await fetch(`${SPOTIFY_API}/audio-analysis/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}


export async function getAlbumBySpotifyId(token, id) {
    const response = await fetch(`${SPOTIFY_API}/albums/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}


export async function getArtistBySpotifyId(token, id) {
    const response = await fetch(`${SPOTIFY_API}/artists/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}



export async function getArtistAlbumsBySpotifyId(token, id) {
    const response = await fetch(`${SPOTIFY_API}/artists/${id}/albums`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getSpotifyUserId(token) {
    const response = await fetch(`${SPOTIFY_API}/me`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + token
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function updateUser(state, id) {
    const response = await fetch(`${DBURL}/user/${id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: {has_logged_in : state}
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function createLearnedSong(model) {
    const response = await fetch(`${DBURL}/learned_songs`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(model)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getAllLearnedSongsByUserId(UserId) {
    const response = await fetch(`${DBURL}/learned_songs?user_id=${UserId}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}


export async function deleteLearnedSong(id) {
    const response = await fetch(`${DBURL}/learned_songs/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }
}

export async function getLearnedSongById(id) {
    const response = await fetch(`${DBURL}/learned_songs/${id}`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}


export async function getLearnedSongBySpotifyIdAndUserId(song_id, user_id) {
    const response = await fetch(`${DBURL}/learned_songs?song_id=${song_id}&user_id=${user_id}`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}
export async function getAllLearnedSongByUserIdAndTechniqueId(id, Technique_id) {
    const response = await fetch(`${DBURL}/learned_songs?user_id=${id}&techniqueId=${Technique_id}`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}