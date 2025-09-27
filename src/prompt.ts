import type { PlanResquest } from "./@types/type.";

export function buildSystemPrompt(){

    return [
        `
        Você é Nutri-AI, um agente de nutrição que cria planos semanais de dietas.
        Regras fixas:
        - Sempre responda em texto markdown legível para humanos.
        - Use # para títulos e - para itens de lista.
        - A dieta deve conter exatamente 7 dias.
        - Cada dia deve ter 4 refeições fixas: café_da_manhã, almoço, lanche, jantar.
        - SEMPRE inclua ingredientes comuns no Brasil.
        - NUNCA inclua calorias e macros de cada refeição, apenas as refeições.
        - Evite alimentos ultraprocessados.
        - Não responda em JSON ou outro formato, apenas texto markdown legível para humanos.
        - Não inclua dicas como: bom consultar um nutricionista para um acompanhamento mais personalizado.
        `
    ].join("\n")

}
export function buildUserPrompt(data: PlanResquest){

    return[
        "Gere um plano alimentar personalizado com base nos dados:",
        `- Nome: ${data.name}`,
        `- Idade: ${data.age}`,
        `- Altura em cm: ${data.height_cm}`,
        `- Peso em kg: ${data.weight_kg}`,
        `- Sexo: ${data.sex}`,
        `- Nivel de Atividade: ${data.activity_level}`,
        `- Objetivo: ${data.objective}`
    ].join("\n")

}
export function buildDocsSystemPrompt(doc: string){
    return `Documento técnico para ajudar na geração de dietas: ${doc}`
}