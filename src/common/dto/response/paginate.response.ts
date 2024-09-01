import { ApiProperty } from '@nestjs/swagger'

export class PaginateMeta {
  @ApiProperty()
  currentPage: number

  @ApiProperty()
  from: number

  @ApiProperty()
  lastPage: number

  @ApiProperty()
  perPage: number

  @ApiProperty()
  to: number

  @ApiProperty()
  total: number

  constructor(currentPage: number, perPage: number, total: number) {
    this.currentPage = currentPage
    this.from = (currentPage - 1) * perPage + 1
    this.lastPage = Math.ceil(total / perPage)
    this.perPage = perPage
    this.to = currentPage * perPage < total ? currentPage * perPage : total
    this.total = total
  }
}

export class PaginateResponse<T> {
  @ApiProperty({ type: [Object] })
  data: T[]

  @ApiProperty()
  meta: PaginateMeta
}
