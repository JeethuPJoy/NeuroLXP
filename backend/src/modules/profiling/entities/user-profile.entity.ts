import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { ProfileStatus } from '../enums/profile-status.enum';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userId: string;

  // ── Identity ────────────────────────────────────────────
  @Column({ nullable: true }) fullName: string;
  @Column({ nullable: true }) preferredName: string;
  @Column({ nullable: true }) email: string;
  @Column({ nullable: true }) phone: string;
  @Column({ nullable: true }) alternateContact: string;
  @Column({ nullable: true }) emergencyContact: string;
  @Column({ nullable: true }) gender: string;
  @Column({ nullable: true }) dateOfBirth: string;
  @Column({ nullable: true }) country: string;
  @Column({ nullable: true }) state: string;
  @Column({ nullable: true }) city: string;
  @Column({ nullable: true }) languagePreference: string;
  @Column({ nullable: true }) accessibilityNeeds: string;
  @Column({ nullable: true }) deviceAccess: string;
  @Column({ nullable: true }) profilePhoto: string;

  // ── Academic / Hierarchy ────────────────────────────────
  @Column({ nullable: true }) department: string;
  @Column({ nullable: true }) programme: string;
  @Column({ nullable: true }) batch: string;
  @Column({ nullable: true }) cohort: string;
  @Column({ nullable: true }) enrollmentDate: string;
  @Column({ nullable: true }) highestQualification: string;
  @Column({ nullable: true }) academicScore: string;
  @Column({ nullable: true }) institution: string;
  // University extensions
  @Column({ nullable: true }) semester: string;
  @Column({ nullable: true }) credits: string;
  @Column({ nullable: true }) cgpa: string;
  @Column({ nullable: true }) backlogs: string;
  // Corporate extensions
  @Column({ nullable: true }) employeeGrade: string;
  @Column({ nullable: true }) businessUnit: string;
  @Column({ nullable: true }) joiningDate: string;

  // ── Career / Learning Intent ────────────────────────────
  @Column({ nullable: true }) careerGoal: string;
  @Column({ nullable: true }) preferredRole: string;
  @Column({ nullable: true }) preferredIndustry: string;
  @Column({ nullable: true }) learningGoal: string;
  @Column({ nullable: true }) preferredLearningMode: string;
  @Column('simple-array', { nullable: true }) skills: string[];
  @Column('simple-array', { nullable: true }) interests: string[];

  // ── Portfolio ───────────────────────────────────────────
  @Column({ nullable: true }) resumeUrl: string;
  @Column({ nullable: true }) portfolioUrl: string;
  @Column({ nullable: true }) linkedinUrl: string;
  @Column({ nullable: true }) githubUrl: string;
  @Column('simple-array', { nullable: true }) certifications: string[];
  @Column('simple-array', { nullable: true }) projects: string[];

  // ── Placement / Outcome ─────────────────────────────────
  @Column({ nullable: true }) resumeStatus: string;
  @Column({ default: false }) placementEligible: boolean;
  @Column({ nullable: true }) placementOffers: string;
  @Column({ nullable: true }) interviewStatus: string;
  @Column({ nullable: true }) currentStatus: string;

  // ── Consent ─────────────────────────────────────────────
  @Column({ default: false }) consentDataProcessing: boolean;
  @Column({ default: false }) consentEmployerSharing: boolean;
  @Column({ default: false }) consentMarketing: boolean;

  // ── Meta ────────────────────────────────────────────────
  @Column({ type: 'varchar', default: ProfileStatus.DRAFT })
  status: ProfileStatus;

  @Column({ default: 0 }) completionPercentage: number;

  @Column({ nullable: true }) tenantId: string;
  @Column({ nullable: true }) tenantType: string;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
