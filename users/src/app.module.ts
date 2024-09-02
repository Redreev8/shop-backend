import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import connectionConfig from './config/connection-config-typeorm';
import { User } from './users/users.entity';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['.env'],
			isGlobal: true,
			cache: true,
		}),
		TypeOrmModule.forRoot({
			...connectionConfig,
			synchronize: false,
			entities: [User]
		}),
		UsersModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
