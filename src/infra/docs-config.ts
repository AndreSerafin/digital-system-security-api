import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'
import { patchNestJsSwagger } from 'nestjs-zod'
import { Request, Response } from 'express'

export function DocumentConfig(app: INestApplication): void {
  patchNestJsSwagger()

  const apiInfo = new DocumentBuilder()
    .setTitle('Digital Security System - Rest API')
    .setVersion('v1')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build()

  const document: OpenAPIObject = SwaggerModule.createDocument(app, apiInfo)

  if (process.env.NODE_ENV === 'production') {
    return
  }

  app.getHttpAdapter().get('/docs/json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(document)
  })

  SwaggerModule.setup('docs', app, document, {
    customCss: `
      .swagger-ui .topbar { background-color: #202122; }`,
  })
}
