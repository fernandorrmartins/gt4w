<h2>Instruções para Uso do Site e API</h2>
[Xampp]<br/>
&ensp;&ensp;&ensp;&ensp;→ Instalar (Apache + MySql + phpadmin)<br/>
&ensp;&ensp;&ensp;&ensp;♦ Windows: https://www.apachefriends.org/xampp-files/7.4.3/xampp-windows-x64-7.4.3-0-VC15-installer.exe<br/>
&ensp;&ensp;&ensp;&ensp;♦ Linux: https://www.apachefriends.org/xampp-files/7.4.3/xampp-linux-x64-7.4.3-0-installer.run<br/>
<br/>
&ensp;&ensp;&ensp;&ensp;→ Executar o Xampp:<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;► MySql<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;► Apache<br/>
<br/>
[Criar Banco de Dados]<br/>
&ensp;&ensp;&ensp;&ensp;→ Abrir phpmyadmin:<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;► Abrir o navegador<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;► Na url do navegador, abrir link http://localhost/phpmyadmin/<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;► Ir na opção 'SQL'<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;► Ir a pasta do projeto 'GT4W', em seguida 'Schem (Sql)' e abrir o arquivo 'DataBase - Schema - GT4W.sql'<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;► Copiar o esquema do banco de dados, colar na opção 'SQL' do phpmyadmin<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;► Executar o script<br/>
<br/>
[Instalar NPM]<br/>
&ensp;&ensp;&ensp;&ensp;♦ Windows: https://nodejs.org/dist/v12.16.1/node-v12.16.1-x64.msi<br/>
&ensp;&ensp;&ensp;&ensp;♦ Linux: pkg install node<br/>
<br/>
&ensp;&ensp;&ensp;&ensp;→ Após Instalação:<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;► Ir até a pasta do Projeto GT4W<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;► Abrir o terminal do Sistema Operacional na pasta do projeto<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;► Executar a API:<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;• nodemon run<br/>
<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;Obs¹: A API estará rodando na porta 83<br/>
<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;para ver todos os registros cadastrados pode acessar o link:<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;♦ localhost:83/pessoa/getall<br/>
<br/>
[Preparar o Site]<br/>
&ensp;&ensp;&ensp;&ensp;→ Ir até a pasta do Projeto GT4W<br/>
&ensp;&ensp;&ensp;&ensp;→ Se desejar pode executar o arquivo index.html diretamente com dois clicks ou Copiar a pasta 'Site GT4W' para a pasta raiz do Xampp e Acessar o site pelo link: http://localhost/Site%20GT4W/<br/>
&ensp;&ensp;&ensp;&ensp;Obs¹: A porta padrão do Xampp após a instalação é 80. Se não estiver com esta porta padrão, deverá executar o link apontando para a porta configurada.
