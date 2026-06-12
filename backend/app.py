from flask import Flask, request, jsonify
import json
import math

app = Flask(__name__)

@app.route("/atividades", methods=["POST"])
def listar_atividades():

    page = request.args.get("page", default=1, type=int)

    with open("atividades.json", "r", encoding="utf-8") as arquivo:
        atividades = json.load(arquivo)

    atividades.sort(key=lambda x: x["hora"])

    por_pagina = 5

    inicio = (page - 1) * por_pagina
    fim = inicio + por_pagina

    total_paginas = math.ceil(len(atividades) / por_pagina)

    return jsonify({
        "pagina": page,
        "total_paginas": total_paginas,
        "dados": atividades[inicio:fim]
    })

if __name__ == "__main__":
    app.run(debug=True)