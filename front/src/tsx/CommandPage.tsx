import '../css/CommandPage.css';
import React from 'react';
import { Api, getCookie } from '../services/Api';
import { commandStatus, Product, ProductType } from '../services/type';
import { Command, CommandCard } from './CommandCard';
import { ProductShopping } from './ShoppingList';
const {GoogleCharts} = require("google-charts")

type CommandPageProps = {
}

type CommandPageState = {
  commands: Command[]
}

export class CommandPage extends React.Component<CommandPageProps, CommandPageState> {
  constructor(props:any) {
    super(props)

    this.state = {
      "commands": []
    }
  }

  render() {
    return (
      <>
    <div className="commandPage">
      <div className="section-1">
        <div className="block-1">
          <div className="element-1">COMMANDE EN COURS</div>
          <br />
          <div className="element-2">{this.state.commands.filter((cmd)=>cmd.status==commandStatus.PREPARE).length}</div>
        </div>  
        <br />
        <div className="part-1">
          <div className="block-2">
          {this.state.commands.map((command)=>{
                if(command.status == commandStatus.SEND) return
                return (
                  <CommandCard commands={command}></CommandCard>
                )
              })}
            </div>
        </div>
      </div><div className="section-2">
          <div className="block-3">
            <div className="element-3">COMMANDE PASSEES</div>
            <br />
            <div className="element-4">{this.state.commands.filter((cmd)=>cmd.status==commandStatus.SEND).length}</div>
          </div>
          <br />
          <div className="part-2">
            <div className="block-4">
            {this.state.commands.map((command)=>{
                if(command.status == commandStatus.PREPARE) return
                return (
                  <CommandCard commands={command}></CommandCard>
                )
              })}
            </div>
            </div>
        </div>
        </div>
        <div id="chart_div"></div></>
    )
  }

  componentDidMount() {
    this.getCommands()
  }

  //TODO: add commands dates
  async getCommands(){
    var _login = getCookie("login")
    var _password = getCookie("password")
    if(_login && _password){
      await Api.login(_login,_password)
    }

    const commands = await Api.getCommand()
    this.setState({commands});

        //Load the charts library with a callback
        GoogleCharts.load(drawChart);
    
        const _this = this
        function drawChart() {
          var data = new GoogleCharts.api.visualization.DataTable();
          data.addColumn('string', 'Month');
          data.addColumn('number', '€');
    
          const monthDatas:any = {}
          _this.state.commands.forEach(command => {
            const date = new Date(command.date)

            if(date.getFullYear() < new Date().getFullYear()) return

            if(!monthDatas[monthToString(date.getMonth())]) monthDatas[monthToString(date.getMonth())] = 0
            
            command.product.forEach((product)=>{
              monthDatas[monthToString(date.getMonth())] += parseFloat((product.price * product.quantity).toString())
            })

          });

          data.addRows([
            [{v: "jan", f: 'jan'}, monthDatas["jan"]],
            [{v: "fev", f: 'fev'}, monthDatas["fev"]],
            [{v: "mar", f:'mar'}, monthDatas["mar"]],
            [{v: "avr", f: 'avr'}, monthDatas["avr"]],
            [{v: "mai", f: 'mai'}, monthDatas["mai"]],
            [{v: "jui", f: 'jui'}, monthDatas["jui"]],
            [{v: "juil", f: 'juil'}, monthDatas["juil"]],
            [{v: "aou", f: 'aou'}, monthDatas["aou"]],
            [{v: "sept", f: 'sept'}, monthDatas["sept"]],
            [{v: "oct", f: 'oct'}, monthDatas["oct"]],
            [{v: "nov", f: 'nov'}, monthDatas["nov"]],
            [{v: "dec", f: 'dec'}, monthDatas["dec"]],
          ]);
    
          var options = {
            title: 'Profits ' + new Date().getFullYear(),
            hAxis: {
              title: 'Mois',
            },
            vAxis: {
              title: '€'
            }
          };
    
          var chart = new GoogleCharts.api.visualization.ColumnChart(
            document.getElementById('chart_div'));
    
          chart.draw(data, options);
        }
  }
}

function monthToString(month:number){
  switch (month) {
    case 1:
      return "jan"
    case 2:
      return "fev"
    case 3:
      return "mars"
    case 4:
      return "avr"
    case 5:
      return "mai"
    case 6:
      return "jui"
    case 7:
      return "juil"
    case 8:
      return "aou"
    case 9:
      return "sep"
    case 10:
      return "oct"
    case 11:
      return "nov"
    case 12:
      return "dec"
    default:
      return "jan"
      break;
  }
}