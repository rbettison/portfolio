export async function createComment({postId, message, parent, userId} : 
        {postId: string, message: string, parent: string, userId: string}) {
    console.log('postId, message, parentId, userId: ' + postId + message + parent + userId);
    return fetch(`/api/blog/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({parent, message, userId})
    }).then(async resp => {
        let body = await resp.json();
        console.log('status: ' + resp.status);
        if(resp.status != 200) return Promise.reject(body?.message)
        else return body;
    })
}

export async function updateComment({postId, message, id} : 
        {postId: string, message: string, id: string}) {
    
    return fetch(`/api/blog/${postId}/comments/${id}`, {
        method:'PUT',
        body: JSON.stringify({message})
    }).then(async resp => {
        let body = await resp.json();
        console.log('status: ' + resp.status);
        if(resp.status != 200) return Promise.reject(body?.message)
        else return body;
    })
}

export async function deleteComment({postId,id} : 
    {postId: string, id: string}) {
        console.log('id: ' + id + ", postId: " + postId);
    return fetch(`/api/blog/${postId}/comments/${id}`, {
        method:'DELETE'
    }).then(async resp => {
        let body = await resp.json();
        console.log('status: ' + resp.status);
        if(resp.status != 200) return Promise.reject(body?.message)
        else return body;
    })
}

export async function toggleCommentLike({postId, id} : {postId: string, id: string}) {
    return fetch(`/api/blog/${postId}/comments/${id}/toggleLike`, {
        method:'POST'
    }).then(async resp => {
        let body = await resp.json();
        console.log('toggle body received: ' + JSON.stringify(body));
        console.log('status: ' + resp.status);
        if(resp.status != 200) return Promise.reject(body?.message)
        else return body;
    })
}