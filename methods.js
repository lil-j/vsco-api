export const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization' : 'Bearer 7356455548d0a1d886db010883388d08be84d0c9'
}

export function getVSCOSiteInfo(username) {
  return fetch(`https://vsco.co/api/2.0/sites?subdomain=${username}`, {
    method: 'GET',
    headers: headers
  })
      .catch((error) => {
        return error;
      })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export function getVSCOProfilePhotos(siteId) {
  return fetch(`https://vsco.co/api/3.0/medias/profile?site_id=${siteId}&limit=14&cursor=`, {
    method: 'GET',
    headers: headers
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export function getVSCOArticles(siteId) {
  return fetch(`https://vsco.co/api/3.0/medias/articles?site_id=${siteId}&page=1&size=12`, {
    method: 'GET',
    headers: headers
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export function getVSCOReposts(siteId) {
  return fetch(`https://vsco.co/api/3.0/medias/reposts?site_id=${siteId}&page=1&size=20`, {
    method: 'GET',
    headers: headers
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}