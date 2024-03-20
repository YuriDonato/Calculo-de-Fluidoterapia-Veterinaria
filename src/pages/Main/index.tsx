import {
  Button,
  Checkbox,
  Input,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Container } from '../../styles'

interface repoDesidratacao {
  '4%': boolean
  '5-6%': boolean
  '8%': boolean
  '10-12%': boolean
  '12-15%': boolean
}

type propPaciente = {
  necessidadeBasal: string
  reposicaoDesidratacao: repoDesidratacao
  perdaHidrica: string
  peso: number
  volumeFinal: number
  limiteInfusao: number
  categoriaLimiteInfusao: string
  taxaInfusao: number
}

const Main = () => {
  const repoEmpty: repoDesidratacao = {
    '4%': false,
    '5-6%': false,
    '8%': false,
    '10-12%': false,
    '12-15%': false
  }
  const pacienteEmpty: propPaciente = {
    necessidadeBasal: '0',
    reposicaoDesidratacao: repoEmpty,
    perdaHidrica: '',
    peso: 0,
    volumeFinal: 0,
    limiteInfusao: 0,
    categoriaLimiteInfusao: '',
    taxaInfusao: 0
  }
  const [paciente, setPaciente] = useState<propPaciente>(pacienteEmpty)
  const [pesoFormatado, setPesoFormatado] = useState<string>('')

  const Calcular = () => {
    let tempNecessidade = 0
    let tempDesidratacao = 0
    let tempPerdaHidrica = 0
    let tempLimiteInfusao = 0

    switch (paciente.necessidadeBasal) {
      case 'adulto':
        tempNecessidade = 40
        break
      case 'filhote':
        tempNecessidade = 70
        break
    }

    if (paciente.reposicaoDesidratacao['4%']) {
      tempDesidratacao += 4
    }
    if (paciente.reposicaoDesidratacao['5-6%']) {
      tempDesidratacao += 5
    }
    if (paciente.reposicaoDesidratacao['8%']) {
      tempDesidratacao += 8
    }
    if (paciente.reposicaoDesidratacao['10-12%']) {
      tempDesidratacao += 10
    }
    if (paciente.reposicaoDesidratacao['12-15%']) {
      tempDesidratacao += 12
    }

    switch (paciente.perdaHidrica) {
      case 'diarreia':
        tempPerdaHidrica = 40
        break
      case 'vomito':
        tempPerdaHidrica = 50
        break
      case 'ambos':
        tempPerdaHidrica = 60
        break
    }

    switch (paciente.categoriaLimiteInfusao) {
      case 'canino':
        setPaciente({ ...paciente, limiteInfusao: 60 })
        break
      case 'felino':
        setPaciente({ ...paciente, limiteInfusao: 50 })
        break
    }

    tempNecessidade = paciente.peso * tempNecessidade
    tempDesidratacao = paciente.peso * tempDesidratacao * 10
    tempPerdaHidrica = paciente.peso * tempPerdaHidrica
    tempLimiteInfusao = paciente.limiteInfusao * paciente.peso
    setPaciente({ ...paciente, taxaInfusao: tempLimiteInfusao })
    setPaciente({
      ...paciente,
      volumeFinal: tempNecessidade + tempDesidratacao + tempPerdaHidrica
    })
  }

  useEffect(() => {
    Calcular()
  }, [paciente])

  useEffect(() => {
    // Quando o pesoFormatado mudar, atualiza o paciente
    setPaciente((prevState) => ({
      ...prevState,
      peso: parseFloat(pesoFormatado)
    }))
  }, [pesoFormatado])

  return (
    <Container>
      <h1>Calculadora</h1>

      {/* Necessidade basal de liquidos (Levando em conta apenas carnivoro)*/}
      <>
        <Select
          placeholder="Selecione a categoria de especie"
          marginTop={'1rem'}
          onChange={(e) => {
            setPaciente({
              ...paciente,
              categoriaLimiteInfusao: e.currentTarget.value
            })
          }}
        >
          <option value="felino">Felino</option>
          <option value="canino">Canino</option>
        </Select>
        <Select
          placeholder="Selecione a categoria de idade"
          marginTop={'1rem'}
          onChange={(e) => {
            setPaciente({
              ...paciente,
              necessidadeBasal: e.currentTarget.value
            })
          }}
        >
          <option defaultChecked value="adulto">
            Adulto
          </option>
          <option value="filhote">Filhote</option>
        </Select>
      </>

      {/* Peso do animal */}
      <Input
        placeholder="Insira o peso do animal"
        value={pesoFormatado}
        onChange={(e) => {
          let pesoValue = e.currentTarget.value
          // Substituir vírgulas por pontos
          pesoValue = pesoValue.replace(',', '.')
          // Remover todos os caracteres exceto números e ponto
          pesoValue = pesoValue.replace(/[^0-9.]/g, '')
          setPesoFormatado(pesoValue)
        }}
      ></Input>

      {/* % de Desidratação */}
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Marcar</Th>
              <Th>% de desidratação</Th>
              <Th>Sinais clinicos associados</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Checkbox
                  onChange={(e) => {
                    setPaciente({
                      ...paciente,
                      reposicaoDesidratacao: {
                        ...paciente.reposicaoDesidratacao,
                        '4%': !paciente.reposicaoDesidratacao['4%']
                      }
                    })
                  }}
                  iconColor="red"
                  colorScheme="red"
                ></Checkbox>
              </Td>
              <Td>4%</Td>
              <Td>Apenas histórico de adipsia</Td>
            </Tr>
            <Tr>
              <Td>
                <Checkbox
                  onChange={(e) => {
                    setPaciente({
                      ...paciente,
                      reposicaoDesidratacao: {
                        ...paciente.reposicaoDesidratacao,
                        '5-6%': !paciente.reposicaoDesidratacao['5-6%']
                      }
                    })
                  }}
                  iconColor="red"
                  colorScheme="red"
                ></Checkbox>
              </Td>
              <Td>5-6%</Td>
              <Td>
                Urina concentrada, apatia, redução da elasticidade cutânea e
                mucosas parcialmente ressecadas
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Checkbox
                  onChange={(e) => {
                    setPaciente({
                      ...paciente,
                      reposicaoDesidratacao: {
                        ...paciente.reposicaoDesidratacao,
                        '8%': !paciente.reposicaoDesidratacao['8%']
                      }
                    })
                  }}
                  iconColor="red"
                  colorScheme="red"
                ></Checkbox>
              </Td>
              <Td>8%</Td>
              <Td>
                Redução da elasticidade cutânea, mucosas secas e viscosas,
                retração do bulbo ocular, oligúria e TRC {'>'} 3
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Checkbox
                  onChange={(e) => {
                    setPaciente({
                      ...paciente,
                      reposicaoDesidratacao: {
                        ...paciente.reposicaoDesidratacao,
                        '10-12%': !paciente.reposicaoDesidratacao['10-12%']
                      }
                    })
                  }}
                  iconColor="red"
                  colorScheme="red"
                ></Checkbox>
              </Td>
              <Td>10-12%</Td>
              <Td>
                Todos os sinais anteriores acrescidos de pulso fraco e
                contrações involuntarias
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Checkbox
                  onChange={(e) => {
                    setPaciente({
                      ...paciente,
                      reposicaoDesidratacao: {
                        ...paciente.reposicaoDesidratacao,
                        '12-15%': !paciente.reposicaoDesidratacao['12-15%']
                      }
                    })
                  }}
                  iconColor="red"
                  colorScheme="red"
                ></Checkbox>
              </Td>
              <Td>12-15%</Td>
              <Td>Choque e óbito</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Marcar</Th>
              <Th>% de desidratação</Th>
              <Th>Sinais clinicos associados</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      {/* Perdas Hídricas Contínuas */}
      <Select
        placeholder="Determine as perdas hídricas contínuas"
        marginTop={'1rem'}
        onChange={(e) => {
          setPaciente({ ...paciente, perdaHidrica: e.currentTarget.value })
        }}
      >
        <option defaultChecked value="vomito">
          Vômito
        </option>
        <option value="diarreia">Diarréia</option>
        <option value="ambos">Ambos</option>
      </Select>

      {/* somar tudo e mostrar */}
      {paciente.volumeFinal ? (
        <h1>Volume Total: {paciente.volumeFinal}ml/dia</h1>
      ) : (
        <></>
      )}

      {/* <h1>Velocidade de Infusão: {taxaInfusao}ml/hora</h1> */}
    </Container>
  )
}

export default Main
