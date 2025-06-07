const preloadImage = (src: string) => {
    return new Promise<string>((resolve) => {
        const img = new Image();
        img.onload = () => {
            resolve(src);
        };
        img.onerror = img.onabort = () => {
            console.error(`ERROR LOADING IMAGE: ${src}`);
            resolve(src);
        };
        img.src = src;
    });
};

const preloadVideo = (src: string) => {
    return new Promise<string>((resolve) => {
        const video = document.createElement("video");
        video.preload = "auto";
        video.src = src;
        video.onloadeddata = () => {
            resolve(src);
        };
        video.onerror = video.onabort = () => {
            console.error(`ERROR LOADING VIDEO: ${src}`);
            resolve(src);
        };
    });
};

const preloadAudio = (src: string) => {
    return new Promise<string>((resolve) => {
        const audio = new Audio();
        audio.preload = "auto";
        audio.src = src;
        audio.oncanplaythrough = () => {
            resolve(src);
        };
        audio.onerror = audio.onabort = () => {
            console.error(`ERROR LOADING AUDIO: ${src}`);
            resolve(src);
        };
    });
};

export const preloadImages = async (srcList: string[]) => {
    await Promise.all(srcList.map(preloadImage));
    console.log(`PRELOADED ${srcList.length} IMAGES`);
};

export const preloadVideos = async (srcList: string[]) => {
    await Promise.all(srcList.map(preloadVideo));
    console.log(`PRELOADED ${srcList.length} VIDEOS`);
};

export const preloadAudios = async (srcList: string[]) => {
    await Promise.all(srcList.map(preloadAudio));
    console.log(`PRELOADED ${srcList.length} AUDIOS`);
};

export const preloadAllImages = async () => {
    const images = document.querySelectorAll("img");
    const srcList = Array.from(images).map((img) => img.src);
    await preloadImages(srcList);
};

export const preloadImagesWithPromise = async (srcList: string[]) => {
    return new Promise<void>((resolve) => {
        Promise.all(srcList.map(preloadImage));
        console.log(`PRELOADED ${srcList.length} IMAGES`);
        resolve();
    });
};
