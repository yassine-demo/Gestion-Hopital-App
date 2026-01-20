import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinManagementComponent } from './medecin-management';

describe('MedecinManagement', () => {
  let component: MedecinManagementComponent;
  let fixture: ComponentFixture<MedecinManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedecinManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedecinManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
