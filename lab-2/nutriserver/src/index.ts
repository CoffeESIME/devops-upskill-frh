import server from './config/server'
import './config/database'
server.listen(server.get('port'))
console.log(`Server listening on ${server.get('port')}`)