# AJT Sistemas e Serviços — site

Site institucional de página única (SPA com roteamento por hash) da AJT Sistemas
e Serviços. Implementado a partir do design `AJT Sistemas e Serviços.dc.html`
(Claude Design), convertido para HTML/CSS/JS estático.

## Estrutura

```
index.html        # marcação das 5 seções (Início, Serviços, Produtos, Equipe, Contato)
css/style.css     # estilos e tokens de design (cores, fontes, espaçamentos)
js/app.js         # roteamento por hash, estado do menu, ano e formulário de contato
assets/           # logos (ícone e logo completa)
```

## Rodar localmente

Qualquer servidor estático serve. Por exemplo:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

As seções são alternadas pelo hash da URL (`#inicio`, `#servicos`, `#produtos`,
`#equipe`, `#contato`). O formulário de contato abre o cliente de e-mail do
usuário com a mensagem pré-preenchida (`mailto:`).

## Personalização

- **Cor de destaque:** padrão monocromático. Para trocar, defina
  `data-accent="azul"` ou `data-accent="verde"` na tag `<html>`.
- **Grade do hero:** desligue com `data-grid="off"` na tag `<html>`.
