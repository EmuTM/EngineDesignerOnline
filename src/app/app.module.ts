import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import {
  PanelModule,
  MenubarModule,
  ToolbarModule,
  TooltipModule,
  AccordionModule,
  InputTextModule,
  DataTableModule,
  ButtonModule,
  ContextMenuModule,
  SplitButtonModule,
  MenuModule,
  DialogModule,
  CardModule,
  DropdownModule,
  SliderModule,
  StepsModule,
  RadioButtonModule,
  TreeModule,
  ScrollPanelModule,
  CheckboxModule,
  ProgressBarModule,
  FileUploadModule
} from 'primeng/primeng';

import * as THREE from 'three';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SplitPaneModule } from 'ng2-split-pane/lib/ng2-split-pane';
import { NgPipesModule } from 'ngx-pipes';

import { HomeComponent } from './gui/home/home.component';
import { FillHeightDirective } from './directives/fill-height/fill-height.directive';
import { EnginePropertiesComponent } from './gui/engine-properties/engine-properties.component';
import { CustomTooltipDirective } from './directives/custom-tooltip/custom-tooltip.directive';
import { CustomInputTextComponent } from './components/custom-input/custom-input-text/custom-input-text.component';
import { CustomInputTextFloatingPointComponent } from './components/custom-input/custom-input-text/custom-input-text-floating-point.component';
import { CustomPropertyComponent } from './components/custom-property/custom-property.component';
import { CustomPropertyFloatingPointComponent } from './components/custom-property/custom-property-floating-point.component';
import { EngineViewerComponent } from './gui/engine-viewer/engine-viewer.component';
import { PreventContextMenuDirective } from './directives/prevent-context-menu/prevent-context-menu.directive';
import { CustomPanelComponent } from './components/custom-panel/custom-panel.component';
import { CustomizablePipe } from './directives/customizable-pipe/customizable-pipe';
import { CustomDialogComponent } from './components/custom-dialog/custom-dialog.component';
import { CustomMenuDirective } from './directives/custom-menu/custom-menu.directive';
import { CustomInputDropdownComponent } from './components/custom-input/custom-input-dropdown/custom-input-dropdown.component';
import { CustomInputSliderComponent } from './components/custom-input/custom-input-slider/custom-input-slider.component';
import { AddCylinderDialogComponent } from './gui/add-cylinder-dialog/add-cylinder-dialog.component';
import { CreateEngineDialogComponent } from './gui/create-engine-dialog/create-engine-dialog.component';
import { CustomStepsComponent } from './components/custom-steps/custom-steps.component';
import { CustomStepComponent } from './components/custom-steps/custom-step/custom-step.component';
import { CustomInputCheckboxComponent } from './components/custom-input/custom-input-checkbox/custom-input-checkbox.component';
import { CustomUploadComponent } from './components/custom-upload/custom-upload.component';


@NgModule({
  declarations: [
    HomeComponent,
    FillHeightDirective,
    EnginePropertiesComponent,
    CustomTooltipDirective,
    CustomInputTextComponent,
    CustomInputTextFloatingPointComponent,
    CustomPropertyComponent,
    CustomPropertyFloatingPointComponent,
    EngineViewerComponent,
    PreventContextMenuDirective,
    CustomPanelComponent,
    CustomizablePipe,
    CustomDialogComponent,
    CustomMenuDirective,
    CustomInputDropdownComponent,
    CustomInputSliderComponent,
    AddCylinderDialogComponent,
    CreateEngineDialogComponent,
    CustomStepsComponent,
    CustomStepComponent,
    CustomInputCheckboxComponent,
    CustomUploadComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    // ta bedarija mora bit, ker čene ne dela splitbutton
    RouterModule.forRoot([{ path: '', component: HomeComponent }]),

    PanelModule,
    MenubarModule,
    ToolbarModule,
    TooltipModule,
    AccordionModule,
    InputTextModule,
    DataTableModule,
    ButtonModule,
    ContextMenuModule,
    SplitButtonModule,
    MenuModule,
    DialogModule,
    CardModule,
    DropdownModule,
    SliderModule,
    StepsModule,
    RadioButtonModule,
    TreeModule,
    ScrollPanelModule,
    CheckboxModule,
    ProgressBarModule,
    FileUploadModule,

    FlexLayoutModule,
    SplitPaneModule,
    NgPipesModule,

  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule {
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private cameraTarget: THREE.Vector3;
  public scene: THREE.Scene;

}
