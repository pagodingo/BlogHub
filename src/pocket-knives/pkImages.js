const pkImages = {
    loadEmbeddedImages: loadEmbeddedImages,
}

function loadEmbeddedImages(source){
    let images = document.getElementsByTagName("img");
    let array = [].slice.call(images);

    array.forEach((image) => {
        let slug = image.src.split('/').filter(e => e !== '')
        //console.log(slug)
        let png = slug[slug.length - 1]
            image.src = `https://raw.githubusercontent.com/${source}/master/images/${png}`
    });
}

export default pkImages