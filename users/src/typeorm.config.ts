import { DataSource } from 'typeorm'
import connectionConfig from './config/connection-config-typeorm'

const AppDataSource = new DataSource({
    ...connectionConfig,
    entities: ['src/**/*.entity.{ts,js}'],
    migrations: ['src/migration/*.{ts,js}']
})

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err)
    })

export default AppDataSource