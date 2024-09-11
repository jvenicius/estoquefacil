import supabase from './database';

export async function inserirNoBanco(tabela, dados) {
    const { data, error } = await supabase.from(tabela).insert([dados]);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function atualizarNoBanco(tabela, dados, id) {
    const { data, error } = await supabase
        .from(tabela)
        .update(dados)
        .eq('id', id);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
