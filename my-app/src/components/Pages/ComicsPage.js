import ComicsBanner from "../ComicsBanner/ComicsBanner"
import Comics from "../Comics/Comics"
import { Helmet } from "react-helmet"

const ComicsPage = () => {
    return(
      <>
       <Helmet>
            <meta
            name="description"
            content={`Marvel comics page`}
            />
            <title>Marvel comics</title>
        </Helmet>
        <ComicsBanner/>  
        <Comics/>
      </>
    )
}

export default ComicsPage