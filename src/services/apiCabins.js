import supabase from './supabase'

export async function getCabins() {
    const { data, error } = await supabase.from('cabins').select('*')

    if (error) {
        console.log('Cabins could not be loaded')
        throw new Error('Cabins could not be loaded')
    }
    return data
}
