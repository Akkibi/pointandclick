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

export const preloadImages = async (srcList: string[]) => {
    await Promise.all(srcList.map(preloadImage));
    console.log(`PRELOADED ${srcList.length} IMAGES`);
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
