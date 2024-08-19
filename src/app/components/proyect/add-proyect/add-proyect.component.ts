import { Component, Input, Inject, OnInit } from '@angular/core';
import { Proyect } from '../../../models/Proyect';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-proyect',
  standalone: true,
  imports: [SharedModule, FormsModule, CommonModule, NgSelectModule],
  templateUrl: './add-proyect.component.html',
  styleUrl: './add-proyect.component.css',
})
export class AddProyectComponent implements OnInit {
  @Input() changeViewMode!: (type: string) => void;
  @Input() submitNewProyect!: (p: Proyect) => void;
  @Input() proyectToEdit!: Proyect;
  newProyect: Proyect = {
    idProyect: 0,
    name: '',
    description: '',
    iconName: 'heroFolder',
    color: 'textC',
    lastUpdate: new Date(),
    tasksList: [],
  };

  options: any[] = [
    {
      value: 'heroFolder',
      label: 'Predeterminado',
      icon: 'heroFolder',
    },
    {
      value: 'heroAcademicCap',
      label: 'Academic Cap',
      icon: 'heroAcademicCap',
    },
    { value: 'heroChartPie', label: 'Chart Pie', icon: 'heroChartPie' },
    {
      value: 'heroCircleStack',
      label: 'Circle Stack',
      icon: 'heroCircleStack',
    },
    { value: 'heroHome', label: 'Home', icon: 'heroHome' },
    { value: 'heroBriefcase', label: 'Briefcase', icon: 'heroBriefcase' },
    {
      value: 'heroCodeBracket',
      label: 'Code Bracket',
      icon: 'heroCodeBracket',
    },
  ];

  colors: any[] = [
    {
      value: 'textC',
      label: 'Predeterminado',
    },
    {
      value: 'secondary',
      label: 'Morado',
    },
    {
      value: 'red-500',
      label: 'Rojo',
    },
    {
      value: 'orange-500',
      label: 'Dorado',
    },
    {
      value: 'green-500',
      label: 'Verde',
    },
    {
      value: 'blue-500',
      label: 'Azul',
    },
  ];

  getClassName(type: string, style: string): string {
    return `${type}-${style}`;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitNewProyect(this.newProyect);
  }

  closeOnClickOutside(event: MouseEvent): void {
    this.changeViewMode('none');
  }

  ver = () => console.log(this.newProyect.iconName);
}
