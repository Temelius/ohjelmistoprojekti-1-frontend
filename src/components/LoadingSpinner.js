import React from 'react'
import Loader from 'react-loader-spinner'

const LoadingSpinner = () => {
    return (
        <Loader 
            type="TailSpin" 
            color="#39603D" 
            height={100} width={100} 
        />
    )
}

export default LoadingSpinner