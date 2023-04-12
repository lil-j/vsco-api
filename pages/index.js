import Image from 'next/image'
import {Inter} from 'next/font/google'
import {useState} from "react";
import {getVSCOSiteInfo, getVSCOArticles, getVSCOReposts, getVSCOProfilePhotos} from "@/methods";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    const [username, setUsername] = useState('')
    const [siteIdData, setSiteIdData] = useState(null)
    const [siteId, setSiteId] = useState(null)
    const [profilePhotos, setProfilePhotos] = useState(null)
    const [articles, setArticles] = useState(null)
    const [reposts, setReposts] = useState(null)

    function onSubmit(e) {
        e.preventDefault()
        goSiteId()
    }

    function goSiteId() {
        if (username.length === 0 || siteIdData === "loading") return
        setSiteIdData("loading")
        getVSCOSiteInfo(username).then((data) => {
            console.log(data)
            if (data.description) {
                alert(data.description)
                setSiteIdData(null)
                return
            }
            setSiteIdData(data)
            setSiteId(data.sites[0].id)
        })
    }

    function goProfilePhotos() {
        if (siteId === null || profilePhotos === "loading") return
        setProfilePhotos("loading")
        getVSCOProfilePhotos(siteId).then((data) => {
            setProfilePhotos(data)
        })
    }

    // function goArticles() {
    //     if (siteId === null || articles === "loading") return
    //     setArticles("loading")
    //     getVSCOArticles(siteId).then((data) => {
    //         setArticles(data)
    //     })
    // }
    //
    // function goReposts() {
    //     if (siteId === null || reposts === "loading") return
    //     setReposts("loading")
    //     getVSCOReposts(siteId).then((data) => {
    //         setReposts(data)
    //     })
    // }

    return (
        <div className="max-w-5xl mx-auto pt-16 px-5 md:px-0">
            <h1 className="font-medium text-2xl">Accessing VSCO&apos;s API - <a className="underline hover:no-underline text-blue-500" href="https://twitter.com/notlilj" target="_blank" rel="noreferrer">by @notlilj</a></h1>

            <p className="text-gray-500 mt-1 mb-3">
                <a
                    className="text-blue-500 hover:underline"
                    href="https://vsco.co" target="_blank" rel="noreferrer">VSCO</a>
                {" "}is a popular photo sharing app. It has a public*
                API that allows you to access photos and videos from the app. While not fully intended
                for use by anyone, it has a public key that does not expire, and is global - meaning anyone can access
                it
                without limitations.
            </p>
            <p className="text-gray-500">
                The main flaw in the security of VSCO&apos;s API is within their authentication. <strong>The API key is a bearer token.
                It is not unique, is not tied to a specific user, and does not expire.</strong> This means that anyone can use it
                for any use, and it will not be revoked.
            </p>
            <br/>
            <small className="text-gray-400">
                *while public, it is important to note that it should only be used for educational use only.
                VSCO&apos;s <a className="text-blue-300 hover:underline" href="https://vsco.co/about/terms_of_use"
                          target="_blank" rel="noreferrer">terms of service</a> forbids using their services for
                commercial purposes.
            </small>
            <br/>
            <br/>
            <hr/>
            <br/>
            <h2 className="font-medium text-gray-700 text-xl">1) Retrieve your VSCO Site ID</h2>
            <p
                className="text-gray-500 mt-1 mb-3"
            >
                To access the API, you need to know your VSCO site ID. This is a unique identifier that is assigned to
                each user.
            </p>
            <div className="flex items-center gap-2 mt-2">
                <p className="text-white bg-green-400 rounded-lg p-2">GET</p>
                <p className="text-blue-500 font-mono">
                    https://vsco.co/api/2.0/sites?subdomain=
                    <span
                    className="text-red-500">{username.length > 0 ? username : "your-username"}</span>
                </p>
                {/*<small className="text-gray-300 hover:text-gray-400 cursor-pointer">COPY</small>*/}
            </div>
            {/* Display Headers */}
            <div className="flex items-center gap-2 mt-2">
                <small className="text-gray-500 font-mono">
                    &apos;Content-Type&apos;: &apos;application/json&apos;,
                    <br/>
                    &apos;Accept&apos;: &apos;application/json&apos;,
                    <br/>
                    &apos;Authorization&apos; : &apos;Bearer 7356455548d0a1d886db010883388d08be84d0c9&apos;
                </small>
            </div>
            <br/>
            <form onSubmit={onSubmit}>
                <input
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    placeholder="Enter your VSCO username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-400 text-white rounded-lg p-2 w-full mt-2"
                    onClick={goSiteId}
                >
                    {
                        siteIdData === "loading" ? "LOADING" : "SEND REQUEST"
                    }
                </button>
            </form>

            {
                siteIdData !== null && siteIdData !== "loading" && <div>
                Your ID:{' '}
                <code>
                    {
                        !siteId.description && siteIdData.sites[0].id
                    }
                </code>
                </div>
            }
            <br/>
            <br/>
            <h2 className="font-medium text-gray-700 text-xl">2) Use your site ID for fetching your photos</h2>
            <h3 className="text-gray-500 text-lg font-medium mt-2">From your gallery</h3>
            <div className="flex items-center gap-2">
                <p className="text-white bg-green-400 rounded-lg p-2">GET</p>
                <p className="text-blue-500 font-mono">
                    https://vsco.co/api/3.0/medias/profile?site_id={<span className="text-red-500">{siteId ? siteId : "siteId"}</span>}&limit=14&cursor=
                </p>
                {/*<small className="text-gray-300 hover:text-gray-400 cursor-pointer">COPY</small>*/}
            </div>
            <div className="flex items-center gap-2 mt-2">
                <small className="text-gray-500 font-mono">
                    &apos;Content-Type&apos;: &apos;application/json&apos;,
                    <br/>
                    &apos;Accept&apos;: &apos;application/json&apos;,
                    <br/>
                    &apos;Authorization&apos; : &apos;Bearer 7356455548d0a1d886db010883388d08be84d0c9&apos;
                </small>
            </div>
            {
                siteId && <button
                    className="bg-blue-500 hover:bg-blue-400 text-white rounded-lg p-2 w-full mt-2"
                    onClick={goProfilePhotos}
                >
                    {
                        profilePhotos === "loading" ? "LOADING" : "SEND REQUEST"
                    }
                </button>
            }
            {
                profilePhotos !== null && profilePhotos !== "loading" && <div className="flex mt-2 overflow-x-auto">
                    {
                        profilePhotos.media.map((photo, index) => {
                            console.log(photo)
                            return (
                                    <img
                                        key={index}
                                        className="h-48 w-48 object-cover"
                                        src={"https://" + photo.image.responsive_url} alt=""/>
                            )
                        })
                    }
                </div>
            }
            <h3 className="text-gray-500 text-lg font-medium mt-2">From your journal</h3>
            <div className="flex items-center gap-2">
                <p className="text-white bg-green-400 rounded-lg p-2">GET</p>
                <p className="text-blue-500 font-mono">
                    https://vsco.co/api/3.0/medias/articles?site_id={<span className="text-red-500">{siteId ? siteId : "siteId"}</span>}&page=1&size=12
                </p>
                {/*<small className="text-gray-300 hover:text-gray-400 cursor-pointer">COPY</small>*/}
            </div>
            <div className="flex items-center gap-2 mt-2">
                <small className="text-gray-500 font-mono">
                    &apos;Content-Type&apos;: &apos;application/json&apos;,
                    <br/>
                    &apos;Accept&apos;: &apos;application/json&apos;,
                    <br/>
                    &apos;Authorization&apos; : &apos;Bearer 7356455548d0a1d886db010883388d08be84d0c9&apos;
                </small>
            </div>
            <h3 className="text-gray-500 text-lg font-medium mt-2">From your reposts</h3>
            <div className="flex items-center gap-2">
                <p className="text-white bg-green-400 rounded-lg p-2">GET</p>
                <p className="text-blue-500 font-mono">
                    https://vsco.co/api/3.0/medias/reposts?site_id={<span className="text-red-500">{siteId ? siteId : "siteId"}</span>}&page=1&size=20
                </p>
                {/*<small className="text-gray-300 hover:text-gray-400 cursor-pointer">COPY</small>*/}
            </div>
            <div className="flex items-center gap-2 mt-2">
                <small className="text-gray-500 font-mono">
                    &apos;Content-Type&apos;: &apos;application/json&apos;,
                    <br/>
                    &apos;Accept&apos;: &apos;application/json&apos;,
                    <br/>
                    &apos;Authorization&apos; : &apos;Bearer 7356455548d0a1d886db010883388d08be84d0c9&apos;
                </small>
            </div>
        </div>
    )
}
