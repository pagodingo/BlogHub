function Images() {};

Images.prototype.loadEmbeddedImages = (source) => {
    let images = document.getElementsByTagName("img");
    let array = [].slice.call(images);
    array.forEach((image) => {
        let slug = image.src.split('/').filter(e => e !== '') // filter trailing blanks
        if (slug.length > 4 || slug[1].endsWith(".com")){ // To ignore external Images
            return
        }
        let png = slug[slug.length - 1]
            image.src = `https://raw.githubusercontent.com/${source}/master/images/${png}`
    })
}

export default Images
