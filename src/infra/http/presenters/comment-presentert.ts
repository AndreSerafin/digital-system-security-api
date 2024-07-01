import { System } from '@/domain/enterprise/entities/system/system'

export class SystemPresenter {
  static toHTTP(system: System) {
    return {
      id: system.id.toString(),
      description: system.description,
      acronym: system.acronym,
      attendance_email: system.attendanceEmail,
      url: system.url,
      status: system.status,
      lastUpdate_justification: system.lastUpdateJustification,
      last_update_author_id: system.lastUpdateAuthorId?.toString(),
      created_at: system.createdAt.toISOString(),
      updated_at: system.updatedAt ? system.updatedAt.toISOString() : null,
    }
  }
}
