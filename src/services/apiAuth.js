import supabase, { supabaseUrl } from './supabase'

export async function Login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) throw new Error(error.message)
    return data
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession() //wezmie dane z localstorage
    //sprawdzamy w protected rout
    if (!session.session) return null

    const { data, error } = await supabase.auth.getUser()
    if (error) throw new Error(error.message)
    return data?.user
}

export async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
}
export async function signUp({ email, password, fullName }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            // ab przekazać jakieś dane o user dodajemy go do nowego options
            data: {
                fullName,
                avatar: '',
            },
        },
    })
    if (error) throw new Error(error.message)
    return data
}
export async function updateUser({ password, fullName, avatar }) {
    // 1 Update password OR fullNAme,
    let updateData
    if (password) updateData = { password }
    if (fullName) updateData = { data: { fullName } }

    const { data, error } = await supabase.auth.updateUser(updateData)

    if (error) throw new Error(error.message)
    if (!avatar) return data

    // 2 Upload the avatar
    const fileName = `avatar-${data.user.id}-${Math.random()}`

    const { error: storageError } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatar)

    if (storageError) throw new Error(storageError.message)

    // 3 Update avatar in user
    const { error: error2, data: updatedAvatar } =
        await supabase.auth.updateUser({
            data: {
                avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
            },
        })
    if (error2) throw new Error(error2.message)
    return updateUser
}
