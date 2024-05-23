import './index.css'

const Images = props => {
  const {details, onMatchImage} = props
  const {thumbnailUrl, id} = details
  const onSelectImage = () => {
    onMatchImage(id)
  }
  return (
    <li className="lis">
      <button className="imageBtn" onClick={onSelectImage}>
        <img className="thumbNail" src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}
export default Images
