const prisma = require('../lib/prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Cadastro da barbearia
exports.registerBarbearia = async (req, res) => {

    const {
        id,
        nome_barbearia,
        email,
        cnpj,
        senha,
        endereco,
        lat,
        lng,
        telefone,
        link_instagram } = req.body

    // Validações
    if (!nome_barbearia) {
        return res.status(422).json({ msg: "O nome da barbearia é obrigatório!" })
    }
    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" })
    }
    if (!cnpj) {
        return res.status(422).json({ msg: "O CNPJ é obrigatório!" })
    }
    if (!senha) {
        return res.status(422).json({ msg: "A senha é obrigatória!" })
    }
    if (!endereco) {
        return res.status(422).json({ msg: "O endereco é obrigatório!" })
    }
    if (!lat) {
        return res.status(422).json({ msg: "A latitude é obrigatória!" })
    }
    if (!lng) {
        return res.status(422).json({ msg: "A longitude é obrigatória!" })
    }
    if (!telefone) {
        return res.status(422).json({ msg: "O telefone é obrigatório!" })
    }
    // if(senha !== confirmarSenha){
    //     return res.status(422).json({ msg: "Senhas não conferem!"})
    // }

    // Checar se o usuário existe
    const barbeariaExiste = await prisma.Barbearia.findUnique({
        where: {
            email: email,

        }
    })

    const barbeariaCnpjExiste = await prisma.Barbearia.findUnique({
        where: {
            cnpj: cnpj
        }
    })

    if (barbeariaExiste) {
        return res.status(422).json({ msg: "Email ja cadastrado!" })
    }

    if (barbeariaCnpjExiste) {
        return res.status(422).json({ msg: "CNPJ ja cadastrado!" })
    }

    // Criar senha
    const salt = await bcrypt.genSalt(12)
    const senhaHash = await bcrypt.hash(senha, salt)



    try {
        const foto_perfil = req.file.path

        if(!foto_perfil) {
            return res.status(422).json({ msg: "A imagem do profissional é obrigatória!" });
        }

        const barbearia = await prisma.barbearia.create({
            data: {
                id,
                nome_barbearia,
                email,
                cnpj,
                senha: senhaHash,
                endereco,
                lat,
                lng,
                foto_perfil,
                telefone,
                link_instagram
            }
        })
        //res.status(201).json(barbearia)
        const chaveSecreta = process.env.SECRET; // Substitua pela sua chave secreta
        const token = jwt.sign({
            id: barbearia.id,
            role: "barbearia"
        }, chaveSecreta, { expiresIn: '1h' });
        const data = { barbearia, token }
        const tokenCookie = res.cookie('token', token, { httpOnly: true, secure: true });
        console.log(tokenCookie)

        return res.json(data)
    }
    catch (error) {
        res.status(400).json({ msg: error.message })
    }

}


//Login da barbearia
exports.loginBarbearia = async (req, res) => {
    const { email, senha } = req.body

    // Validações
    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" })
    }
    if (!senha) {
        return res.status(422).json({ msg: "A senha é obrigatória!" })
    }

    // Checar se o usuário existe
    const barbearia = await prisma.Barbearia.findUnique({
        where: {
            email: email
        }
    })

    if (!barbearia) {
        return res.status(404).json({ msg: "Usuario não encontrado!" })
    }
    // Checar se as senhas conferem
    const checarSenha = await bcrypt.compare(senha, barbearia.senha)
    if (!checarSenha) {
        return res.status(422).json({ msg: "Senhas inválida!" })
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: barbearia.id,
            role: "barbearia"
        }, secret, { expiresIn: '1h' })
        //   res.cookie('token', token);


        res.status(200).json({ msg: "Autenticação realizada com sucesso", token })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.updateBarbearia = async (req, res) => {
    const { id } = req.params

    const {
        nome_barbearia,
        email,
        cnpj,
        senha,
        endereco,
        lat,
        lng,
        foto_perfil,
        telefone,
        link_instagram
    } = req.body

    if (!nome_barbearia) {
        return res.status(422).json({ msg: "O nome da barbearia é obrigatório!" })
    }
    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" })
    }
    if (!cnpj) {
        return res.status(422).json({ msg: "O CNPJ é obrigatório!" })
    }
    if (!senha) {
        return res.status(422).json({ msg: "A senha é obrigatória!" })
    }
    if (!endereco) {
        return res.status(422).json({ msg: "O endereco é obrigatório!" })
    }
    if (!lat) {
        return res.status(422).json({ msg: "A latitude é obrigatória!" })
    }
    if (!lng) {
        return res.status(422).json({ msg: "A longitude é obrigatória!" })
    }
    if (!telefone) {
        return res.status(422).json({ msg: "O telefone é obrigatório!" })
    }
    
        const barbeariaCnpjExiste = await prisma.Barbearia.findUnique({
            where: {
                cnpj: cnpj
            }
        })
        
    
        
    
        if (barbeariaCnpjExiste) {
            return res.status(422).json({ msg: "CNPJ ja cadastrado!" })
        }

        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, salt)

    try {
        
        const existingBarbearia = await prisma.barbearia.findUnique({
            where: {
                id: id
            }
        })

        if (!existingBarbearia) {
            return res.status(404).json({ msg: "Barbearia não encontrada." });
        }
    
        

        const updatedBarbearia = await prisma.barbearia.update({
            where: {
                id: id
            },
            data: {
                nome_barbearia,
                email,
                cnpj,
                senha: senhaHash,
                endereco,
                lat,
                lng,
                foto_perfil,
                telefone,
                link_instagram
            }
        })

        return res.json(updatedBarbearia)

    } catch (error) {
        console.error(`Erro ao atualizar dados da barbearia ${error}`)
    }
}

exports.getBarbearia = async (req, res) => {
    const id = req.params.id;

    const barbearia = await prisma.barbearia.findUnique({
        where: {
            id: id
        },
        include: {
            agendas: true,
            cortesestilos: true,
            profissionais: true,
            horarios: true
        }
    })
    const imagemUrl = `/uploads/${barbearia.foto_perfil}`;
        const barbeariaComImagem = {
            ...barbearia,
            imagemUrl
        };
    if (!barbeariaComImagem) {
        return res.status(404).json({ msg: 'Barbearia não encontrado' });
    }
    return res.json(barbeariaComImagem);
}

exports.getAllBarbearias = async (req, res) => {
    try {
        const barbearias = await prisma.barbearia.findMany()
        const barbeariasComImagem = barbearias.map((barbearia) => {

        const imagemUrl = `/uploads/${barbearia.foto_perfil}`

        return {
            ...barbearia,
            imagemUrl
        }
        })
        return res.json(barbeariasComImagem)
    } catch (error) {
        console.error(`Erro ao buscar barbearias ${error}`)
    }
}


exports.addCorteEstilo = async (req, res) => {
    const {
        id_barbearia,
        nome_corte,
        tempo_estimado,
        preco
    } = req.body

    if (!nome_corte) {
        return res.status(422).json({ msg: "O nome do corte é obrigatório!" })
    }

    if (!tempo_estimado) {
        return res.status(422).json({ msg: "O tempo estimado é obrigatório!" })
    }

    if (!preco) {
        return res.status(422).json({ msg: "O preço é obrigatório!" })
    }

    try {
        const corteestilo = await prisma.cortesEstilos.create({
            data: {
                id_barbearia,
                nome_corte,
                tempo_estimado,
                preco
            }
        })
        return res.json(corteestilo)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }


}

exports.getCortesEstilos = async (req, res) => {

    const id = req.params.id

    try {
        const corteestilo = await prisma.cortesEstilos.findMany({
            where: {
                id_barbearia: id
            }
        })
        return res.json(corteestilo);
    } catch (error) {
        console.error(`Erro ao buscar os cortes de estilos: ${error}`)
    }
}

exports.deleteCorteEstilo = async (req, res) => {
    const id = req.params.id

    try {
        const deletedCorteEstilo = await prisma.cortesEstilos.delete({
            where: {
                id: id
            }
        })
        return res.json(deletedCorteEstilo);
    } catch (error) {
        console.error(`Erro ao excluir o corte ou estilo: ${error}`)
    }
}

 exports.updateCorteEstilo = async (req, res) => {

     const id = req.params.id;
     const {
        nome_corte,
        preco,
        tempo_estimado
     } = req.body

     try {
        const existingCorteEstilo = await prisma.cortesEstilos.findUnique({
            where: { id: id },
          });

        if(!existingCorteEstilo){
            return res.status(404).json({ error: 'Corte ou estilo não encontrado' });
        }

         const updatedCorteEstilo = await prisma.cortesEstilos.update({
             where: {
                 id: id
             },
             data: {
                nome_corte,
                preco,
                tempo_estimado
             }
         })
         return res.json(updatedCorteEstilo)
     } catch(error) {
         console.error(`Erro ao atualizar o corte ou estilo: ${error}`)
     }
 }

exports.addProfissional = async (req, res) => {
    const {
        id_barbearia,
        nome_profissional,    
    } = req.body

    if (!nome_profissional) {
        return res.status(422).json({ msg: "O nome do profissional é obrigatório!" })
    }    

    
    try {
        const foto_profissional = req.file.path

        if (!foto_profissional) {
            return res.status(422).json({ msg: "A imagem do profissional é obrigatória!" });
        }
        // const foto_profissional = req.file;
        const profissional = await prisma.profissional.create({
            data: {
                id_barbearia,
                nome_profissional,
                foto_profissional: foto_profissional
            }
        })
        return res.json(profissional)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.getProfissional = async (req,res) => {
    const id = req.params.id

    try {
        const profissionais = await prisma.profissional.findMany({
            where: {
                id_barbearia: id
            }
        })
        const profissionaisComImagens = profissionais.map((profissional) => {
            // Suponha que o campo 'foto_profissional' contenha o nome do arquivo da imagem
            // e que as imagens estejam armazenadas na pasta 'uploads'
            const imagemUrl = `/uploads/${profissional.foto_profissional}`;
      
            return {
              ...profissional,
              imagemUrl, // Adicione o campo 'imagemUrl' com o caminho da imagem
            };
          });
        return res.json(profissionaisComImagens);
    } catch (error) {
        console.error(`Erro ao buscar os profissionais: ${error}`)
    }
}

exports.deleteProfissional = async (req,res) => {
    const id = req.params.id

    try {
        const deletedProfissional = await prisma.profissional.delete({
            where: {
                id: id
            }
        })
        return res.json(deletedProfissional);
    } catch (error) {
        console.error(`Erro ao excluir o profissional: ${error}`)
    }
}

exports.createHorarioDisponivel = async (req, res) => {

    const {
        id_barbearia,
        dataHorario,
        horario
    } = req.body

    const horarioExiste = await prisma.horarioDisponivel.findUnique({
        where: {
            dataHorario: dataHorario
        }
    })

    if (horarioExiste) {
        return res.status(400).json({ error: "Horário já existe." });
    }

    try {
        const novoHorario = await prisma.HorarioDisponivel.create({
            data: {
                id_barbearia,
                dataHorario,
                horario,
                disponivel: true,
            }
        })

        return res.json(novoHorario)
    } catch (error) {
        console.error(`Erro ao adicionar horário: ${error}`)
        return res.status(500).json({ error: "Erro ao adicionar horário" });
    }
}

exports.getHorariosDisponiveis = async (req, res) => {

    const id = req.params.id

    try {
      const horarios = await prisma.HorarioDisponivel.findMany({
        where: {
            id_barbearia: id
        }
      });
      return res.json(horarios);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar horários disponíveis.' });
    }
  }

exports.deleteHorario = async (req,res) => {
    const id = req.params.id

    try {
        const deletedHorario = await prisma.horarioDisponivel.delete({
            where: {
                id: id
            }
        })
        return res.json(deletedHorario)
    } catch (error) {
        console.error(`Erro ao excluir o horario: ${error}`)
    }
}

exports.getAgendas= async (req, res) => {
    const idBarbearia = req.params.id;

    try {
        const agendas = await prisma.agenda.findMany({
            where: {
                id_barbearia: idBarbearia
            },
        });


        const agendaDetails = []

        for (const agenda of agendas) {
            const { id, id_cliente, id_profissional, id_corteestilo, id_datahorario} = agenda;

            // Consultar informações relacionadas separadamente

            const cliente = await prisma.cliente.findUnique({
                where: {
                    id: id_cliente
                }
            })


            const profissional = await prisma.profissional.findUnique({
                where: {
                    id: id_profissional
                }
            })

            const corteestilo = await prisma.cortesEstilos.findUnique({
                where: {
                    id: id_corteestilo
                }
            })

            const datahorario = await prisma.horarioDisponivel.findUnique({
                where: {
                    id: id_datahorario
                }
            });


            const agendaInfo = {
                id,
                cliente,
                profissional,
                corteestilo,
                datahorario
            };

            agendaDetails.push(agendaInfo)
        }

        return res.json(agendaDetails)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar agendas do cliente.' });
    }
}

exports.cancelAgenda = async (req, res) => {
    const id = req.params.id

    try {
        const canceledAgenda = await prisma.agenda.delete({
            where: {
                id: id
            }
        })
        return res.json(canceledAgenda);
    } catch (error) {
        console.error(`Erro ao cancelar agenda: ${error}`)
    }
}



