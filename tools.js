export const random = (from, to) => {
    if (Number(from) > Number(to)) {
        throw Error('Wrong values')
    }

    return (
        !to
            ? Math.ceil(Math.random() * Number(from))
            : Math.ceil(Math.random() * (Number(to) - Number(from))) + Number(from)
    )
}