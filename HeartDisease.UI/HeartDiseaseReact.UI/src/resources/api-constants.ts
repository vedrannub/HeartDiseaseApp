const baseUrl = 'http://localhost:5142'

export const getPredictions = () => {
    return baseUrl + '/predictions'
}

export const getPredictionById = (id : string): string => {
    return baseUrl + '/precitions' + id
}