import React, {SyntheticEvent, useState} from "react"



import "./index.scss"


const ImageUpload = () => {
    const [imageData, setImageData ] = useState({
        file: '',
        imagePreviewUrl: ''
    })

    const _handleImageChange = (e : any) => {
        e.preventDefault()
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setImageData({
                file: file,
                imagePreviewUrl: reader.result as string
            })
        }
        if (file && file.type.match('image.*')) {
            reader.readAsDataURL(file)
        }
    }

    let imgPreview = null
    if (imageData.imagePreviewUrl) {
        imgPreview = <img src={imageData.imagePreviewUrl} />
    } else {
        imgPreview = (<div className="imageUpload__emptyImg">Please select an Image for Preview</div>)
    }

    return (
        <div
            className="imageUpload__previewComponent"
        >
            <input
                type="file"
                onChange={(e)=> _handleImageChange(e)}
                className="imageUpload__fileInput"
            />
            <div className="imageUpload__imgPreview">
                {imgPreview}
            </div>
        </div>
    )
}


export default ImageUpload