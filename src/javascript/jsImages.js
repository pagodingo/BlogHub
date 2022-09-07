const jsImages = {
    loadEmbeddedImages: loadEmbeddedImages,
}

function loadEmbeddedImages(source){
    let images = document.getElementsByTagName("img");
    let array = [].slice.call(images);

    array.forEach((image) => {
        let slug = image.src.split('/').filter(e => e !== '') // filter trailing blanks
        // Ignoring External Images
        if (slug.length > 4 || slug[1].endsWith(".com")){
            return
        }
        //console.log(slug)
        let png = slug[slug.length - 1]
            image.src = `https://raw.githubusercontent.com/${source}/master/images/${png}`
    });
}

export default jsImages